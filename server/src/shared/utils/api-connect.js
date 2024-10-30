const fs = require('fs');
const path = require('path');

const { config } = require('../config/config');
const { error } = require('console');

TOKEN_CLIENT_CRIDENTIALS = 'none';

const handleError = (res, error) => {
    console.log(error);
    res.status(500).json({error});
}

function writeLog(message) {
    const date = new Date();

    const logFileName = `${date.toISOString().slice(0, 10)}-${date.getHours()}-log.txt`;
    const logFilePath = path.join(__dirname, '..', '..', '..', 'logs', logFileName);

    try {
        // Create the logs directory if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'logs'))) {
            fs.mkdirSync(path.join(__dirname, '..', '..', '..', 'logs'));
        }

        // Append the log message to the file
        fs.appendFileSync(logFilePath, `${date.toISOString()}, ${message}\n`);
        
    } catch (err) {
        console.error('Error writing log:', err);
    }
}

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
    console.log('code', code);

    const body = new URLSearchParams();
    body.append('grant_type', "authorization_code");
    body.append('redirect_uri', 'http://localhost:4200/login');
    body.append('code', code);

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(config.spotify.clientId + ':' + config.spotify.clientSecret)
    };

    console.log('hhh ',headers);
    console.log('body ',body.toString());

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: headers,
        body: body.toString()
    });

    return await response.json();

}

async function fetchSpotifyApi(clientIP, endpoint, method, body = null, code = null) {
    // try {
        console.log('fetchSpotifyApi', endpoint, method, body);

        let token = TOKEN_CLIENT_CRIDENTIALS.access_token;
        if (code !== null) {
            token = await getACToken(code);
        }

        let headers = {
            Authorization: `Bearer ${token}`
        }

        const response = await fetch(`https://api.spotify.com/${endpoint}`, {
            method,
            headers: headers,
            body
        });

        if (response.status === 401) {
            const date = new Date();
            console.log('Token expired ', date);

            TOKEN_CLIENT_CRIDENTIALS = await getCCToken();
            message = `Token_expired/New_Token, ${TOKEN_CLIENT_CRIDENTIALS.access_token}`;
            writeLog(message);
            
            return fetchSpotifyApi(clientIP, endpoint, method, body);
        } else {
            message = `${method}, ${endpoint}, ${clientIP}, ${body}, ${response.status},`;
            writeLog(message);

            return await response.json();
        }
        
    // } catch {
    //     console.log('fetch error', error);
    // }
}

module.exports = {
    fetchSpotifyApi,
    handleError
}