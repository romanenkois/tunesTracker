const { fetchSpotifyApi } = require('../../../api/api-connect');
const { handleError } = require('../../../shared/utils/error-handler');

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

module.exports = getUserProfile;
