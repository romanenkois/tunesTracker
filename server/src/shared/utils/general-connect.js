token = '';

const handleError = (res, error) => {
    console.log(error);
    res.status(500).json({error});
}

async function getSecretToken() {
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    body.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    body.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
    
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

async function fetchSpotifyApi(endpoint, method, body) {
    try {
        const response = await fetch(`https://api.spotify.com/${endpoint}`, {
            method,
            headers: {
                Authorization: `Bearer ${token.access_token}`
            },
            method,
            body
        });
        if (response.status === 401) {
            date = new Date();
            console.log('Token expired ', date);
            token = await getSecretToken();
            return fetchSpotifyApi(endpoint, method, body);
        } else {
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