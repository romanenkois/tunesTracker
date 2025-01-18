const { response } = require('express');
const { fetchSpotifyApi } = require('../../../api/api-connect');
const { handleError } = require('../../../shared/utils/error-handler');
const { config } = require('../../../shared/config/config');
const { sendMessage } = require('../../../shared/utils/telegram.notifier');

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
        if (userData.error || userData['error']) {
            res.status(401).json({"errorMessage": 'something happend??????', 'response': userData})
        }

        if (config.consoleLoging.userAuth) {
            if (config.consoleLoging.userAuth === 'full') {
                console.log('User authenticated:', userData);
                sendMessage(`User authenticated: ${JSON.stringify(userData)}`);
            } else {
                console.log('User authenticated:', userData.display_name);
                sendMessage(
                    `User authenticated:\n
                    ${userData.display_name}, ${userData.country},\n
                    ${userData.email}
                    `);
            }
        }
        data = {
            "userData": userData,
            "responseStatus": 'access granted'
        }
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = getUserTopItems;
