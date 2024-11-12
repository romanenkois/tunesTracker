const express = require('express');
const router = express.Router();

const {
    getUserTopItems,
    getUserProfile
} = require('./user-data.controller');

router.get('/top-items/:type', getUserTopItems);
router.get('/user-profile/', getUserProfile);

module.exports = router;
