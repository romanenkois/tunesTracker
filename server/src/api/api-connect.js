const { writeLog } = require('../shared/utils/logger');
const { getCCToken, getRefreshToken, getUserAccessToken } = require('./token-handler');
const { addNewRecord, getUserRefreshToken } = require('./connections-handler');
const { config } = require('../shared/config/config');

TOKEN_CLIENT_CRIDENTIALS = 'none';

async function fetchSpotifyApi(clientIP, endpoint, method, body, code, tokenAC) {
    if (config.consoleLoging.fetchSpotifyFunction) {
        console.log(
            'Fetch Spotify Api function call \n',
            { clientIP, endpoint, method, body, code, tokenAC }
        );
    }

    // initially the token is set to be as a general server side token
    let token = TOKEN_CLIENT_CRIDENTIALS.access_token;

    // if request directly provides the token, it will be used
    if (tokenAC) {
        token = tokenAC;

    // if req provides THE code, that means the authorization from user is required
    } else if (code) {
        // first we check if user is alredy authorized in active server session
        var userRefreshToken = getUserRefreshToken(code);
        if (userRefreshToken) {
            token = await getUserAccessToken(userRefreshToken);
            token = token.access_token;
        }

        // if not, we will get the token from Spotify, using provided code
        else {
            const tokenData = await getRefreshToken(code);

            // if we get the token, we will use it to req info about user, and use it for further requests
            if (tokenData.access_token) {
                tempToken = tokenData.access_token;
                const userData = await fetchGeneralSpotifyApi('v1/me', 'GET', tempToken, null)
                addNewRecord(tokenData.refresh_token, code, JSON.stringify(userData));

                token = await getUserAccessToken(tokenData.refresh_token);
                token = token.access_token;
            }

            // this is the edge case, when the server has no data of user,
            // that has authorized before, and still is "authorized" on client side
            else if (
            tokenData.error === 'invalid_grant' &&
            tokenData.error_description === 'Invalid authorization code') {

                console.log('error of 87');
                return 'error_87'
            }
        }
    }

    const response = await fetchGeneralSpotifyApi(endpoint, method, token, body);

    if (config.server.consoleLogTokenUsed) {
        console.log('TOKEN TO BE USED:\n', token);
    }

    if (response?.error?.status == '401' && !code && !tokenAC) {
        console.log('Token expired ', new Date());

        TOKEN_CLIENT_CRIDENTIALS = await getCCToken();
        message = `Token_expired/New_Token, ${TOKEN_CLIENT_CRIDENTIALS.access_token}`;
        writeLog(message);

        return await fetchGeneralSpotifyApi(endpoint, method, TOKEN_CLIENT_CRIDENTIALS.access_token, body);;
    }

    return await response;
}

async function fetchGeneralSpotifyApi(endpoint, method, token, body) {
    if (config.server.consoleLogActualSpotifyFetch) {
        console.warn(
            'Direct fetch to spotify \n',
            { endpoint, method, token, body}
        );
    }


    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`
        },
        body
    });
    return await response.json();
}

module.exports = {
    fetchSpotifyApi,
}
