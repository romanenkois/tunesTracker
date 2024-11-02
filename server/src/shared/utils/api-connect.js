const { writeLog } = require('./logger');
const { getACToken, getCCToken } = require('./token-handler');

TOKEN_CLIENT_CRIDENTIALS = 'none';

async function fetchSpotifyApi(clientIP, endpoint, method, body, code, tokenAC) {
    // try {
        console.log('fetchSpotifyApi', endpoint, method, body);

        let token = TOKEN_CLIENT_CRIDENTIALS.access_token;
        if (tokenAC) {
            // console.warn('tokenAC')
            token = tokenAC;
        } else if (code) {
            // console.warn('code')
            const tokenData = await getACToken(code);
            console.log(tokenData);
            console.warn(tokenData.access_token);
            console.log(tokenData.refresh_token);
            token = tokenData.access_token;
            // console.warn(token);
        } else {
            // console.warn('none')
            // if (TOKEN_CLIENT_CRIDENTIALS === 'none') {
            //     TOKEN_CLIENT_CRIDENTIALS = await getCCToken();
            // }
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


    // } catch {
    //     console.log('fetch error', error);
    // }
}

module.exports = {
    fetchSpotifyApi
}
