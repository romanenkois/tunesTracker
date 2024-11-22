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
                    itemInAlbumsRanking.songsIndexes.push(tracksFetched);
                } else {
                    albumsRanking.push({
                        id: item.album.id,
                        songsIndexes: [tracksFetched],
                    });
                }

            });
        }

        // table to manage score system
        let scoresTable = [
            { 'start': 1, 'end': 10, 'score': 200 },
            { 'start': 11, 'end': 50, 'score': 100 },
            { 'start': 51, 'end': 100, 'score': 80 },
            { 'start': 101, 'end': 200, 'score': 60 },
            { 'start': 201, 'end': 500, 'score': 45 },
            { 'start': 501, 'end': 999999, 'score': 1 },
        ];
        let scoreInflation = 50;

        // at first we loop each item to add a property of finalScore
        albumsRanking.forEach((item) => {
            let finalScore = 0;

            // secondly we loop through the array of track indexes in this album
            item.songsIndexes.forEach((songIndex) => {

                // then using the rating table, we assign the score
                scoresTable.forEach((rating) => {
                    if (
                        (songIndex >= rating.start) &&
                        (songIndex <= rating.end)
                    ) {
                        finalScore += rating.score
                    }
                })

                // we add a little more score, so the albums with more items would go higher
                finalScore += scoreInflation;
            })

            item.finalScore = finalScore;
        })

        // after base look of the ranking, we can sort it
        albumsRanking = albumsRanking.sort((a, b) => b.finalScore - a.finalScore).slice(0, limit);

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

const getUserTopGenres = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
        const { code } = req.headers;
        const { time_range } = req.query;
        const { limit } = req.query;

        // just a simple params check before
        if (!code || !limit || parseInt(limit) < 0
            || !(time_range != 'short_term' || time_range != 'medium_term' || time_range != 'long_term')
        ) {
            res.status(400).json({ error: 'bad params' })
            return;
        }

        let genresRanking = [];
        let genresList = [];
        let itemsFetched = 0;

        let returnArtistsData = true;

        let inflatedLimit = parseInt(limit) + 50;
        while (genresRanking.length < inflatedLimit) {
            let reqLimit = inflatedLimit - genresRanking.length;
            if (reqLimit > 50) {
                reqLimit = 50;
            }
            // just to not fetch a really lot of stuff
            if (itemsFetched > 150) {
                break;
            }

            let endpoint = `v1/me/top/artists?time_range=${time_range}&limit=${reqLimit}&offset=${itemsFetched}`;
            let response = await fetchSpotifyApi(clientIP, endpoint, 'GET', null, code, null);

            // so called responce error handling
            if (!response || response.error || !response.items || response.items.length == 0 || response == 'error_87') {
                break;
            }

            response.items.forEach((artist) => {
                itemsFetched += 1;
                if (!artist.genres || artist.genres.length < 1) {
                    return;
                }

                artist.genres.forEach((genre) => {
                    let genreInList = genresRanking.find((listGenre) => listGenre.genre === genre);
                    if (genreInList) {
                        genreInList.artistIndexes.push(itemsFetched)
                        genreInList.artistIds.push(artist.id)

                        if (returnArtistsData) {
                            genreInList.artists.push(artist)
                        }
                    } else {
                        let genreRecord = {
                            genre: genre,
                            artistIndexes: [itemsFetched],
                            artistIds: [artist.id]
                        };
                        if (returnArtistsData) {
                            genreRecord.artists = [artist];
                        }
                        genresRanking.push(genreRecord);
                    }
                })
            })
        }

        // coefficients for score managing
        let scoresTable = [
            { 'start': 1, 'end': 10, 'score': 200 },
            { 'start': 11, 'end': 50, 'score': 100 },
            { 'start': 51, 'end': 100, 'score': 80 },
            { 'start': 101, 'end': 200, 'score': 60 },
            { 'start': 201, 'end': 500, 'score': 45 },
            { 'start': 501, 'end': 999999, 'score': 1 },
        ];
        let scoreInflation = 50;

        genresRanking.forEach((genreRecord) => {
            let finalScore = 0;
            genreRecord.artistIndexes.forEach((genreArtistIndex) => {
                scoresTable.forEach((rating) => {
                    if (
                        (genreArtistIndex >= rating.start) &&
                        (genreArtistIndex <= rating.end)
                    ) {
                        finalScore += rating.score;
                    }
                })

                finalScore += scoreInflation;
            })
            genreRecord.finalScore = finalScore;
        })

        genresList = genresRanking.sort((a, b) => b.finalScore - a.finalScore).slice(0, limit)
        res.status(200).json(genresList)
        return;
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
    getUserTopGenres,
    getUserProfile
}
