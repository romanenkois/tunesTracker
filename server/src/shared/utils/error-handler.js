const { writeLog } = require('./logger');

/**
 * Handles error by writting it into console and sending a 500 status response.
 *
 */
const handleError = (res, error) => {
    console.log(error);
    writeLog(`ERROR: ${error}`);
    res.status(500).json({error});
}

module.exports = { handleError };
