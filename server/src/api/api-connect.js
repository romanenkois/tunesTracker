const { writeLog } = require('../shared/utils/logger');
const { getCCToken, getRefreshToken, getUserAccessToken } = require('./token-handler');
const { addNewRecord, getUserRefreshToken } = require('./connections-handler');

TOKEN_CLIENT_CRIDENTIALS = 'none';

async function fetchSpotifyApi(clientIP, endpoint, method, body, code, tokenAC) {
    console.log('fetchSpotifyApi', endpoint, method, body);

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
                const userData = await fetchSpotifyApi('::1', 'v1/me', 'GET', null, null, tempToken);
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
            }
        }
    }

    // actual fetch to spotify api
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
