const { fetchSpotifyApi } = require('../../api/api-connect');
const { handleError } = require('../../shared/utils/error-handler');
const { addNewRecord, getAllUserData } = require('../../api/connections-handler')

const getAllUserDataReq = async (req, res) => {
    try {
        data = getAllUserData();
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}


const addNewUserDirectly = async (req, res) => {
    try {
        const { refreshtoken } = req.params;
        const { code } = req.query;
        const { userdata } = req.query;

        if (!refreshtoken || !code || !userdata) {
            res.status(400).send('no.')
            return
        }
        addNewRecord(refreshtoken, code, userdata);

        res.status(200).json(getAllUserData())

    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllUserDataReq,
    addNewUserDirectly
}
