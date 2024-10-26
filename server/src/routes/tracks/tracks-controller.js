const { fetchSpotifyApi } = require('../../shared/utils/api-connect');

const getTrack = async (req, res) => {
    try {
        const data = await fetchSpotifyApi(`v1/tracks/${req.params.id}`, 'GET');
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getTrack
}
