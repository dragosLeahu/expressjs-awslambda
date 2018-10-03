const {
  MongoClient
} = require('mongodb')
const dbConfig = require('./config/database')
const {
  dbName,
  dbUrl
} = dbConfig.mongo
const option = {
  numberOfRetries: 5,
  auto_reconnect: true,
  poolSize: 10,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
}

let pooledDB

function MongoPool () {}

function initPool (callback) {
  MongoClient.connect(dbUrl, option, (err, client) => {
    if (err) {
      console.log(`=> Could not connect to db ${dbName}`)
      if (callback && typeof (callback) === 'function') {
        callback(null)
      }
    } else {
      console.log(`=> Succesfully connected to db ${dbName}`)

      pooledDB = client.db(dbName)

      if (callback && typeof (callback) === 'function') {
        callback(pooledDB)
      }
    }
  })
  return MongoPool
}

MongoPool.initPool = initPool

function getInstance (callback) {
  if (!pooledDB) {
    initPool(callback)
  } else {
    if (callback && typeof (callback) === 'function') {
      callback(pooledDB)
    }
  }
}

MongoPool.getInstance = getInstance

function getCollection (name, callback) {
  this.getInstance(function (db) {
    if (!db) {
      callback(null)
    } else {
      let collection = db.collection(name)
      callback(collection)
    }
  })
}

MongoPool.getCollection = getCollection

module.exports = MongoPool
