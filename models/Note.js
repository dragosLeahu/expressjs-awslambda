const dbConnection = require('../db')

module.exports = (callback) => {
  dbConnection(function(err, db) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, db.collection('notes'))
    }
  })
}