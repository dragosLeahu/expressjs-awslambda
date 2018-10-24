const config = require('../../config/local')
const env = config.app.env

/**
 * Custom error object used for sending the error data to the client.
 *
 * @class APIError
 */
class APIError {
  constructor (success, status, error, stack) {
    this.success = success
    this.status = status
    this.error = error
    if (stack && (env === 'local' || 'development')) {
      this.stack = stack
    } else {
      this.stack = ''
    }
  }
}

module.exports = APIError
