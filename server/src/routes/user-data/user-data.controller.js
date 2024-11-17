const { fetchSpotifyApi } = require('../../api/api-connect');
const { handleError } = require('../../shared/utils/error-handler');

const getUserTopItems = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;

        const { code } = req.headers;
        const { tokenac } = req.headers;

        const { type } = req.params;
        const { time_range } = req.query;
        const { limit } = req.query;
        const { offset } = req.query;

        let endpoint = `v1/me/top/${type}`;
        if (time_range) {
            endpoint += `?time_range=${time_range}`;
        }
        if (limit) {
            endpoint += `&limit=${limit}`;
        }
        if (offset) {
            endpoint += `&offset=${offset}`;
        }

        const data = await fetchSpotifyApi(clientIP, endpoint, 'GET', null, code, tokenac);
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

const getUserTopAlbums = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
        const { code } = req.headers;
        const { time_range } = req.query;
        const { limit } = req.query;

        // default values
        let albumsRanking = [];
        let tracksFetched = 0;

        // now we loop, until the requested limit is reached
        // to make it looking lessthen just list of favorite tracks, we add a bit more of data to the loop
        let inflatedLimit = parseInt(limit) + 200;
        while (albumsRanking.length < inflatedLimit) {

            // the limit is calculated, how much tracks are needed,
            // at the same time, it cant be more then 50
            let reqLimit = inflatedLimit - albumsRanking.length;
            if (reqLimit > 50) {
                reqLimit = 50;
            }

            // now we assemble api req endpoint and fetch it
            let endpoint = `v1/me/top/tracks?time_range=${time_range}&limit=${reqLimit}&offset=${tracksFetched}`;
            let response = await fetchSpotifyApi(clientIP, endpoint, 'GET', null, code, null);
            // tracksFetched += response.items.length;
            if (response.items.length == 0) {
                break;
            }

            // then, looping through every item, we add it to the ranking
            response.items.forEach(item => {
                tracksFetched += 1;
                let itemInAlbumsRanking = albumsRanking.find(album => album.id === item.album.id);
                if (itemInAlbumsRanking) {
                    itemInAlbumsRanking.score.push(tracksFetched);
                } else {
                    albumsRanking.push({
                        id: item.album.id,
                        score: [tracksFetched],
                    });
                }

            });
        }

        // let scoresTable = [
        //     {'start': 1, 'end': 10, 'score': 200},
        //     {'start': 11, 'end': 50, 'score': 100},
        //     {'start': 51, 'end': 100, 'score': 80},
        //     {'start': 101, 'end': 200, 'score': 60},
        //     {'start': 201, 'end': 500, 'score': 45},
        //     {'start': 501, 'end': 999999, 'score': 1},
        // ];

        albumsRanking.forEach((item) => {
            let finalScore = 0;
            item.score.forEach((scoreIndex) => {
                if (scoreIndex <= 10) {
                    finalScore += 200;
                } else if (scoreIndex <= 50) {
                    finalScore += 100;
                } else if (scoreIndex <= 100) {
                    finalScore += 80;
                } else if (scoreIndex <= 200) {
                    finalScore += 50;
                } else if (scoreIndex <= 500) {
                    finalScore += 20;
                } else {
                    finalScore += 5;
                }


            })
            item.finalScore = finalScore;
        })

        console.log(albumsRanking);

        // after base look of the ranking, we can sort it
        albumsRanking = albumsRanking.sort((a, b) => b.finalScore - a.finalScore).slice(0, limit);
        console.log(albumsRanking);

        // after sorting, we also fetch data, to return sorted full album data
        let albums = [];
        while (albums.length < albumsRanking.length) {
            // each iteration of fetch is no more then 20 albums
            let albumsToFetch = '';
            let albumsToFetchNumber = ((albumsRanking.length - albums.length) > 20) ? 20 : albumsRanking.length - albums.length;

            // assembling of string from albumsRanking
            for (let i = 0; i < albumsToFetchNumber; i++) {
                albumsToFetch += `${albumsRanking[albums.length + i].id},`;
            }
            let response = await fetchSpotifyApi('::1', `v1/albums?ids=${albumsToFetch}`, 'GET');

            // then we add data from response to albums
            for (let i = 0; i < response.albums.length; i++) {
                albums.push(response.albums[i]);
            }
        }

        res.status(200).json(albums);
    } catch (error) {
        handleError(res, error);
    }
}

const getUserProfile = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;

        const { code } = req.headers;
        const { tokenac } = req.headers;

        const data = await fetchSpotifyApi(clientIP, 'v1/me', 'GET', null, code, tokenac);
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getUserTopItems,
    getUserTopAlbums,
    getUserProfile
}
