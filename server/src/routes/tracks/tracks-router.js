const express = require('express');
const router = express.Router();

const {
    getTrack,
    getTracks
} = require('./tracks-controller');

router.get('/track/:id', getTrack);
router.get('/tracks/:ids', getTracks);

module.exports = router;