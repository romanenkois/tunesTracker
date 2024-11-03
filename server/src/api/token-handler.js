const { config } = require('../shared/config/config');

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

async function getACToken(code) {

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

async function getRefreshToken(refreshToken) {
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
    getACToken,
    getRefreshToken
}
