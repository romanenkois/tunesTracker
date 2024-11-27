const config = {
    server: {
        port: 3000,
        // testingRouteAccess: process.env.TESTING_ROUTE_ACCESS,
        testingRouteAccess: true,
    },
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectURI: process.env.SPOTIFY_REDIRECT_URI,
    },
    other: {
        telegramBotId: process.env.TELEGRAM_BOT_ID,
        telegramAdminId: process.env.TELEGRAM_ADMIN_ID
    }
}

module.exports = {
    config
};
