token = [];


function addNewRecord(refreshToken, code, userData) {
    this.token.push({
        refresh_token: refreshToken,
        code: code,
        user_data: userData
    });
}

function getUserRefreshToken(code) {
    for (let i = this.token.length - 1; i >= 0; i--) {
        if (this.token[i].code === code) {
            return this.token[i].refresh_token;
        }
    }
    return null;
}

module.exports = {
    addNewRecord,
    getUserRefreshToken,
}
