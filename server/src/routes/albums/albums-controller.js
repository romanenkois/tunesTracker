const { fetchSpotifyApi } = require('../../api/api-connect');
const { handleError } = require('../../shared/utils/error-handler');

const getAlbum = async (req, res) => {
    try {
        const clientIP =  await req.connection.remoteAddress || req.socket.remoteAddress;
        const { id } = req.params;
        const { market } = req.query;

        let endpoint = `v1/albums/${id}`;
        if (market) {
            endpoint += `?market=${market}`;
        }

        const data = await fetchSpotifyApi(clientIP, endpoint, 'GET');
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}
module.exports = {
    getAlbum
}
