const express = require('express');
const router = express.Router();

const {
    getArtist,
    getArtists
} = require('./artists-controller');

router.get('/artist/:id', getArtist);
router.get('/artists/:ids', getArtists);

module.exports = router;
