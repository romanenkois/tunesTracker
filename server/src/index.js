// third-party imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// env imports
dotenv.config();
const { config } = require('./shared/config/config'); // should be done before dotenv config ????????

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

if (true) {
    const testingRouter = require('./routes/testing/testing-router');
    app.use('/testing', testingRouter);
}

// it sends an admin in telegram, that the server is up. additionally it passes config info
var text = `server loaded || ${JSON.stringify(config)}`
var url = `https://api.telegram.org/bot${config.other.telegramBotId}/sendMessage?chat_id=${config.other.telegramAdminId}&text=${text}`

axios.get(url)
    .then(response => {
        console.log('Telegram message sent:', response.data.ok);
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
