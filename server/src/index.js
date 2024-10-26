// third-party imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// env imports
dotenv.config();
const { config } = require('./shared/config/config');

// routers imports
const tracksRouter = require('./routes/tracks/tracks-router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers implementation
app.use(tracksRouter);

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});