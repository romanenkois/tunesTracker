// third-party imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// env imports
dotenv.config();
const { config } = require('./shared/config/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// main router
const v1Router = express.Router();
const tracksRouter = require('./routes/tracks/tracks-router');
const albumsRouter = require('./routes/albums/albums-router');
const artistsRouter = require('./routes/artists/artists-router');

v1Router.use('/albums', albumsRouter);
v1Router.use('/artists', artistsRouter);
v1Router.use('/tracks', tracksRouter);

// implementing main router
app.use('/tunes-tracker-api', v1Router);

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});