const express = require('express');
const router = express.Router();

const {
    getUserTopItems,
    getUserTopAlbums,
    getUserProfile
} = require('./user-data.controller');

router.get('/top-items/:type', getUserTopItems);
router.get('/top-albums', getUserTopAlbums);
router.get('/user-profile/', getUserProfile);

module.exports = router;
