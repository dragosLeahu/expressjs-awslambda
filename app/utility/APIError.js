/**
 * Custom error object used for sending the error data to the client.
 *
 * @class APIError
 */
class APIError {
  constructor (success, status, error, stack = '') {
    this.success = success
    this.status = status
    this.error = error
    this.stack = stack
  }
}

module.exports = APIError
