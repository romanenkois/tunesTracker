const express = require('express');
const router = express.Router();

const getUserTopItems = require('./controllers/get-user-top-items');
const getUserTopAlbums = require('./controllers/get-user-top-albums');
const getUserTopGenres = require('./controllers/get-user-top-genres');
const getUserProfile = require('./controllers/get-user-profile');

router.get('/top-items/:type', getUserTopItems);
router.get('/top-albums', getUserTopAlbums);
router.get('/top-genres', getUserTopGenres);
router.get('/user-profile/', getUserProfile);

module.exports = router;
