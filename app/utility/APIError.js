const config = require('../../config/config')
const { env } = config.app

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
    if (stack && env === 'development') {
      this.stack = stack
    } else {
      this.stack = ''
    }
  }
}

module.exports = APIError
