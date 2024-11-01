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

    // console.log('code', code);

    const body = new URLSearchParams();
    body.append('grant_type', "authorization_code");
    body.append('redirect_uri', 'http://localhost:4200/login');
    body.append('code', code.toString());

    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')

    }

    console.log('header ',headers);
    console.log('body ',body.toString());

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: headers,
        body: body.toString(),
        json: true
    });

    console.log('response', response);

    return await response.json();

}

async function fetchSpotifyApi(clientIP, endpoint, method, body = null, code = null) {
    // try {
        console.log('fetchSpotifyApi', endpoint, method, body);

        // let token = TOKEN_CLIENT_CRIDENTIALS.access_token;




        // if (code !== null) {
        //     token = await getACToken(code);
        //     console.log('\x1b[33m%s\x1b[0m' ,'AC token', token);

        //     // token = 'BQBH86kNSU0YKp9vCG_RKPbFcrPcA9L7VFa0Kc2-C-rVzJrkz9riSJkrtjSrjtF1ZN3jvfWGud2wp4yxmjdsh8gUJKenR5GJ4UNc0Uc1v6rxa8pkV2l7_sxyigLgPYE_cOZuHtMr4TmSi-CMpT1j0cMLNfNSCynfvmMqT97pOlNvjF-H-AlmT0_MY2fVXHWQUejh7v6GLBR5X-Z_pl-aQJqWihjQ0EEKc9MO7pg6YjE'
        // }
        
        token = 'AQDAAnWS2wLumtUpGH1yOcMSPFmZIVMVHzc934KxiR7TrGzxXBu95eF0fpru66wfgp0rggq5kqW_tfAqqFNKPgPuN26Ve9iQEcqmVSrO7ylakLFvQe5FwhXgY43gCI_BDFz2KJK6IShNuP_E7aVPVYVX8nPhnPzYqO_4TkGaOaU6AivRxVu7Lp91OFImU-orh9I2jZy0NobcaeyuLQxuKI6fR3XbF82ZGwYseU9JFicBrckkC4ZB6jKCZwrAf8jlmgQc3YtOB_XVNuCiN3-v4SnAwOfMflXfq7teBHFoWf5o6kgA3T3WZLouV9ukmyR-lY_QOdlVcLhdmrxiNtgbzL2TyUiroSk'

        let headers = {
            Authorization: `Bearer ${token}`
        }
        const response = await fetch(`https://api.spotify.com/${endpoint}`, {
            method,
            headers: headers,
            body
        });

        if (response.status === 401 && code === null) {
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