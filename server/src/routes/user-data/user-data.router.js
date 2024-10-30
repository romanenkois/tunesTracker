const express = require('express');
const router = express.Router();

const {
    getUserTopItems
} = require('./user-data.controller');

router.get('/top-items/:type', getUserTopItems);

module.exports = router;