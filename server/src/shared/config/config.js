const config = {
    server: {
        port: 3000,

        testingRouteAccess: process.env.TESTING_ROUTE_ACCESS === 'true' || false,
    },
    consoleLoging: {
        fetchSpotifyFunction: process.env.CONSOLE_LOG_FETCH_SPOTIFY_FUNCTION === 'true' || false,
        tokenUsed: process.env.CONSOLE_LOG_TOKEN_USED === 'true' || false,
        actualSpotifyFetch: process.env.CONSOLE_LOG_ACTUAL_SPOTIFY_FETCH === 'true' || false,

        userAuth: process.env.CONSOLE_LOG_USER_AUTH || false,
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
