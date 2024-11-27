const express = require('express');
const router = express.Router();

const {
    getAllUserDataReq,
    addNewUserDirectly
} = require('./testing-controller');

router.get('/alluserdata', getAllUserDataReq);
router.get('/addnew/:refreshtoken', addNewUserDirectly);


module.exports = router;
