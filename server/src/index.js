// third-party imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// env imports
dotenv.config();
const { config } = require('./shared/config/config'); // should be done before dotenv config ????????
const { sendMessage } = require('./shared/utils/telegram.notifier');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// main router
const v1Router = express.Router();
const tracksRouter = require('./routes/tracks/tracks-router');
const albumsRouter = require('./routes/albums/albums-router');
const artistsRouter = require('./routes/artists/artists-router');
const userDataRouter = require('./routes/user-data/user-data.router');

v1Router.use('/albums', albumsRouter);
v1Router.use('/artists', artistsRouter);
v1Router.use('/tracks', tracksRouter);
v1Router.use('/user-data', userDataRouter);
app.use('/tunes-tracker-api', v1Router);

if (config.server.testingRouteAccess) {
    const testingRouter = require('./routes/testing/testing-router');
    app.use('/testing', testingRouter);
}

// Start server
const PORT = config.server.port;

app.listen(PORT, () => {
    const text = `server loaded || config on load: ${JSON.stringify(config)}`;
    sendMessage(text);

    console.log(`Server is running on port ${PORT}`);
});
