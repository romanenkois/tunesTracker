const fs = require('fs');
const path = require('path');

const { config } = require('../config/config');

token = '';

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

async function getSecretToken() {
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
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

async function fetchSpotifyApi(clientIP, endpoint, method, body) {
    try {
        const response = await fetch(`https://api.spotify.com/${endpoint}`, {
            method,
            headers: {
                Authorization: `Bearer ${token.access_token}`
            },
            body
        });
        if (response.status === 401) {
            const date = new Date();
            console.log('Token expired ', date);

            token = await getSecretToken();
            message = `Token_expired/New_Token, ${token.access_token}`;
            writeLog(message);
            
            return fetchSpotifyApi(clientIP, endpoint, method, body);
        } else {
            message = `${method}, ${endpoint}, ${clientIP}, ${body}, ${response.status},`;
            writeLog(message);

            return await response.json();
        }

        
    } catch {
        console.log(error);
    }
}

module.exports = {
    fetchSpotifyApi,
    handleError
}