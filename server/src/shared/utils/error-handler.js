const { writeLog } = require('./logger');

/**
 * Handles error by writting it into console and sending a 500 status response.
 *
 */
const handleError = (res, error) => {
    console.warn(
        `
        ------------------------------\n
        RUNTIME ERROR\n
        ------------------------------\n
        \n
        `,
        error, '\n');
    writeLog(`ERROR: ${error}`);
    res.status(500).json({error});
}

module.exports = { handleError };
