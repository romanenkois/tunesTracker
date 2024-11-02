const fs = require('fs');
const path = require('path');

/**
 * Writes an inputed message to a log file.
 * Date is automatically added to the message.
 *
 * @param {string} message - message to write to the log file
 */
function writeLog(message) {
    const date = new Date();

    const logFileName = `${date.toISOString().slice(0, 10)}-${date.getHours()}-log.txt`;
    const logFilePath = path.join(__dirname, '..', '..', '..', 'logs', logFileName);

    try {
        // Create the logs directory if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'logs'))) {
            fs.mkdirSync(path.join(__dirname, '..', '..', '..', 'logs'));
        }

        // Append the log message to the file
        fs.appendFileSync(logFilePath, `${date.toISOString()}, ${message}\n`);

    } catch (err) {
        console.error('Error writing log:', err);
    }
}

module.exports = { writeLog };
