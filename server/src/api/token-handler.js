const { config } = require('../shared/config/config');

/**
 * Fetches a new token for general purposes.
 * This token has no scopes, and used to access public data.
 */
async function getCCToken() {
    const body = new URLSearchParams();
    body.append("grant_type", 'client_credentials');
    body.append("client_id", config.spotify.clientId);
    body.append("client_secret", config.spotify.clientSecret);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: headers,
            body: body.toString()
        });

        return await response.json();

    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}


/**
 * Retrieves a refresh token after user authorization, using the code, user obtained from Spotify.
 *
 * @param {string} code - The authorization code received from Spotify.
 */
async function getRefreshToken(code) {

    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('redirect_uri', config.spotify.redirectURI);
    body.append('code', code.toString());

    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: headers,
        body: body.toString()
    });

    return await response.json();
}

/**
 * Retrieves a new access token using the refresh token.
 *
 * @param {string} refreshToken - The refresh token retrived from Spotify.
 */
async function getUserAccessToken(refreshToken) {
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken);

    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: headers,
        body: body.toString()
    });

    return await response.json();
}

module.exports = {
    getCCToken,
    getRefreshToken,
    getUserAccessToken
}
