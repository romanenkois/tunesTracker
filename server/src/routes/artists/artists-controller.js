const { fetchSpotifyApi } = require('../../shared/utils/api-connect');

const getArtist = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await fetchSpotifyApi(`v1/artists/${id}`, 'GET');
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}
module.exports = {
    getArtist
}
