const constants = require('../utility/constants')

/**
 * Returns target concatinated with a timestamp, different field name stored in the database for the timestamp based on an 'action' string. Returns concatenated JSON.
 *
 * @param {json} target
 * @param {string} dbAction
 */
function addTimestamp (target, dbAction) {
  switch (dbAction) {
    case constants.dbActions.CREATE:
      return Object.assign(target, { createdAt: new Date() })
    case constants.dbActions.UPDATE:
      return Object.assign(target, { updatedAt: new Date() })
  }
}

module.exports = addTimestamp
