const { fetchSpotifyApi, handleError } = require('../../shared/utils/api-connect');

const getUserTopItems = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
        
        const { code } = req.headers;

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

        const data = await fetchSpotifyApi(clientIP, endpoint, 'GET', null, code);
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getUserTopItems
}