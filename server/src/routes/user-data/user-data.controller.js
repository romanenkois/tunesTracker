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
            tracksFetched += response.items.length;
            if (response.items.length == 0) {
                break;
            }

            // then, looping through every item, we add it to the ranking
            response.items.forEach(item => {
                itemInAlbumsRanking = albumsRanking.find(album => album.id === item.album.id);
                if (itemInAlbumsRanking) {
                    itemInAlbumsRanking.score += 1;
                } else {
                    albumsRanking.push({
                        id: item.album.id,
                        score: 1,
                    });
                }
            });
        }

        // after base look of the ranking, we can sort it
        albumsRanking = albumsRanking.sort((a, b) => b.score - a.score).slice(0, limit);

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
