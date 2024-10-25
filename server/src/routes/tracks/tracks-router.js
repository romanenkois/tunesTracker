const express = require('express');
const router = express.Router();

const {
    getTrack
} = require('./tracks-controller');

router.get('/track/:id', getTrack);

module.exports = router;