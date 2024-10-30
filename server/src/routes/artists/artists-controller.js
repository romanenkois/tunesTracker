const { fetchSpotifyApi } = require('../../shared/utils/api-connect');

const getArtist = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
        const { id } = req.params;

        const data = await fetchSpotifyApi(clientIP, `v1/artists/${id}`, 'GET');
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}
module.exports = {
    getArtist
}