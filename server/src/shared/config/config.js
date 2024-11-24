const config = {
    server: {
        port: 3000
    },
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectURI: process.env.SPOTIFY_REDIRECT_URI,
    }
}

module.exports = {
    config
};
