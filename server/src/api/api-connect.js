const { writeLog } = require('../shared/utils/logger');
const { getACToken, getCCToken } = require('./token-handler');

TOKEN_CLIENT_CRIDENTIALS = 'none';

async function fetchSpotifyApi(clientIP, endpoint, method, body, code, tokenAC) {
    console.log('fetchSpotifyApi', endpoint, method, body);

    // initially the token is set to be as a general server side token
    let token = TOKEN_CLIENT_CRIDENTIALS.access_token;

    // if request directly provides the token, it will be used
    if (tokenAC) {
        token = tokenAC;

    // if req provides THE code, it will be used to get token
    } else if (code) {
        // we will try to get ac and refresh token,
        // as we do it first time
        const tokenData = await getACToken(code);
        console.log(tokenData);

        // if we get the token, we will use it right away
        if (tokenData.access_token) {
            token = tokenData.access_token;
            console.warn(tokenData.access_token);
            console.log(tokenData.refresh_token);

            // we will save the refresh token for future use


            // TODO ////////////////////////////////////////////////
        }

        // if we didnt get the token, as it was already used,
        // we will use refresh token to get new one
        else if (
        tokenData.error === 'invalid_grant' &&
        tokenData.error_description === 'Invalid authorization code') {
            // TODO ////////////////////////////////////////////////////
        }

    }

    let headers = {
        Authorization: `Bearer ${token}`
    }
    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
        method,
        headers: headers,
        body
    });

    // checks if the token is expired
    if (response.status === 401 && !code && !tokenAC) {
        const date = new Date();
        console.log('Token expired ', date);

        TOKEN_CLIENT_CRIDENTIALS = await getCCToken();
        message = `Token_expired/New_Token, ${TOKEN_CLIENT_CRIDENTIALS.access_token}`;
        writeLog(message);

        return fetchSpotifyApi(clientIP, endpoint, method, body);
    }

    // request completion
    message = `${method}, ${endpoint}, ${clientIP}, ${body}, ${response.status},`;
    writeLog(message);

    return await response.json();

}

module.exports = {
    fetchSpotifyApi
}
