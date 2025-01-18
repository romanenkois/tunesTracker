const {  } = require('../shared/utils/telegram.notifier')

let token = [];

function addNewRecord(refreshToken, code, userData) {
    token.push({
        refresh_token: refreshToken,
        code: code,
        user_data: userData
    });

    console.log('New token record added'); // should be logged better
}

function removeUserRocord(code) {
    // todo
}

function getUserRefreshToken(code) {
    for (let i = token.length - 1; i >= 0; i--) {
        if (token[i].code === code) {
            return token[i].refresh_token;
        }
    }
    return null;
}

function getAllUserData() {
    return token;
}

module.exports = {
    addNewRecord,
    getUserRefreshToken,
    getAllUserData
}
