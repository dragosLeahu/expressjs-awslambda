/**
 * Custom response object used for sending success response data to the client.
 *
 * @class APIResponse
 */
class APIResponse {
  constructor (success, status, data) {
    this.success = success
    this.status = status
    this.data = data
  }
}

module.exports = APIResponse
