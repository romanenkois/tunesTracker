const axios = require('axios');

const { config } = require('../config/config');

url = `https://api.telegram.org/bot${config.other.telegramBotId}/sendMessage?chat_id=${config.other.telegramAdminId}&text=`;

function sendMessage(text) {
    axios.get(url + text)
        .then(response => {
            console.log('Telegram message sent:', response.data.ok);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}

module.exports = {
    sendMessage
};
