const { fetchSpotifyApi } = require('../../api/api-connect');
const { handleError } = require('../../shared/utils/error-handler');

const getAudioFeatures = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
        const { id } = req.params;
        const data = await fetchSpotifyApi(clientIP, `v1/audio-features/${id}`, 'GET');
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAudioFeatures,
}
