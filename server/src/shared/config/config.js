const config = {
    server: {
      port: process.env.PORT
    },
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    }
}

module.exports = {
    config
};