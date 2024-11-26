const { response } = require('express');
const { fetchSpotifyApi } = require('../../../api/api-connect');
const { handleError } = require('../../../shared/utils/error-handler');

const getUserTopItems = async (req, res) => {
    try {
        const clientIP = req.connection.remoteAddress || req.socket.remoteAddress;
        const { code } = req.headers;

        if (!code || code == undefined) {
            res.status(400).send('No code provided')
            return;
        }

        const userData = await fetchSpotifyApi(clientIP, 'v1/me', 'GET', null, code, null);

        if (!userData ||  userData == undefined ) {
           res.status(400).send('Not a valid code for user lmao')
        }
        // console.log(userData)

        data = {
            "userData": userData,
            "responseStatus": 'access granted'
        }
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = getUserTopItems;
