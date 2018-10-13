const constants = require('../utility/constants')

/**
 * Returns concatinated data with a timestamp, different field name stored in the database for the timestamp based on an action string.
 *
 * @param {json} data
 * @param {string} action
 * @returns {json} JSON object
 */
function addTimestamp (data, action) {
  switch (action) {
    case constants.CREATE:
      return Object.assign(data, { createdAt: new Date() })
    case constants.UPDATE:
      return Object.assign(data, { updatedAt: new Date() })
  }
}

module.exports = addTimestamp
