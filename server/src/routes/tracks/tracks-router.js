const express = require('express');
const router = express.Router();

const {
    getTrack,
    getTracks,
} = require('./tracks-controller');
// const {
//     getAudioFeatures,
// } = require('./audio-features.controller');

router.get('/track/:id', getTrack);
// router.get('/tracks/:ids', getTracks);
// router.get('/audio-features/:id', getAudioFeatures);

module.exports = router;
