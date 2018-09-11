const MongoClient = require('mongodb').MongoClient

//Connection URL
const url = process.env.DB

//Database name
const dbName = process.env.DB_NAME

module.exports = (callback) => {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) {
      callback(err, null);
    } else {
      const db = client.db(dbName)
      console.log('=> Succesfully connected to db ' + dbName)

      callback(null, db)

      client.close()
      console.log('=> Connection to the db server closed')
    }
  })
}