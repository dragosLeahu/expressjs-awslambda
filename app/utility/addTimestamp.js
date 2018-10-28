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
      if (Array.isArray(target)) {
        let newArr = []
        target.forEach(element => {
          let objWithTime = Object.assign(element, { createdAt: new Date().toLocaleString() })
          newArr.push(objWithTime)
        })
        return newArr
      }
      return Object.assign(target, { createdAt: new Date().toLocaleString() })
    case constants.dbActions.UPDATE:
      if (Array.isArray(target)) {
        let newArr = []
        target.forEach(element => {
          let objWithTime = Object.assign(element, { createdAt: new Date().toLocaleString() })
          newArr.push(objWithTime)
        })
        return newArr
      }
      return Object.assign(target, { updatedAt: new Date().toLocaleString() })
  }
}

module.exports = addTimestamp
