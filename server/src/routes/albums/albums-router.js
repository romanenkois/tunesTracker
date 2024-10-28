const express = require('express');
const router = express.Router();

const {
    getAlbum
} = require('./albums-controller');

router.get('/album/:id', getAlbum);

module.exports = router;