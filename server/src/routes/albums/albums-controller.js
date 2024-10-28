const { fetchSpotifyApi } = require('../../shared/utils/api-connect');

const getAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const { market } = req.query;
        
        let endpoint = `v1/albums/${id}`;
        if (market) {
            endpoint += `?market=${market}`;
        }

        const data = await fetchSpotifyApi(endpoint, 'GET');
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}
module.exports = {
    getAlbum
}
