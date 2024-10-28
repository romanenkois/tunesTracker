const express = require('express');
const router = express.Router();

const {
    getArtist
} = require('./artists-controller');

router.get('/artist/:id', getArtist);

module.exports = router;