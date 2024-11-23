const { fetchSpotifyApi } = require('../../../api/api-connect');
const { handleError } = require('../../../shared/utils/error-handler');

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

module.exports = getUserTopGenres;
