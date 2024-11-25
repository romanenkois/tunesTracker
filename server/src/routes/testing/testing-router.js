const express = require('express');
const router = express.Router();

const {
    getAllUserDataReq
} = require('./testing-controller');

router.get('/alluserdata', getAllUserDataReq);


module.exports = router;
