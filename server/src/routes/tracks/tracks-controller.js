const { fetchSpotifyApi } = require('../../shared/utils/api-connect');

const getTrack = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
        const { id } = req.params;
        const { market } = req.query;
        
        let endpoint = `v1/tracks/${id}`;
        if (market) {
            endpoint += `?market=${market}`;
        }

        const data = await fetchSpotifyApi(clientIP, endpoint, 'GET' );
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

const getTracks = async (req, res) => {
    try {
        const data = await fetchSpotifyApi(clientIP, `v1/tracks?ids=${req.params.ids}`, 'GET');
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getTrack,
    getTracks
}
