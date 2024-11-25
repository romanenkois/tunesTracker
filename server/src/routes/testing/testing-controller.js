const { fetchSpotifyApi } = require('../../api/api-connect');
const { handleError } = require('../../shared/utils/error-handler');
const { getAllUserData } = require('../../api/connections-handler');

const getAllUserDataReq = async (req, res) => {
    try {
        data = getAllUserData();
        // console.log('All user data', data);

        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllUserDataReq
}
