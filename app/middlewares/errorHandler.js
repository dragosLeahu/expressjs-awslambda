const d = require('../utility/debugger')('app.js')
const APIError = require('../utility/APIError')
const config = require('../../config/local')

const env = config.app.env

/**
 * Handles any error thrown from the application and sends a response to the client with the error. Also sends the stack trace of the error and prints it in the console if development env.
 *
 * @returns {middleware} Expressjs error handler which returns the error response.
 */
function errorHandler () {
  return (err, req, res, next) => {
    if (env === 'local' || 'development') {
      d(err.stack)
    }

    return res.status(err.status || 500).send(new APIError(false, err.status, err.message, err.stack))
  }
}

module.exports = errorHandler
