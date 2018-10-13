const {
  MongoClient
} = require('mongodb')
const d = require('./app/utility/debugger')('db')
const config = require('./config/config')

const { name, url } = config.mongo
const env = config.app.env
const options = {
  numberOfRetries: 5,
  auto_reconnect: true,
  poolSize: 10,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
}

let pooledDB

/**
 *Initialize a new connection to the database and sets the database instance to a global variable used for pooling the connection.
 *
 */
async function initPool () {
  const client = new MongoClient(url, options)
  let result = await client.connect()
  if (result) {
    let db = client.db(name)
    pooledDB = db
    if (env === 'development') {
      d(`Connected to db ${name}`)
    }
  }
}

/**
 * Initialize a new connection to the database and returns the database instance or just returns the database instance if already connected.
 *
 * @returns MongoDB database instance
 */
async function getInstance () {
  if (!pooledDB) {
    await initPool()
  }
  return pooledDB
}

/**
 *
 *
 * @param {string} name
 * @returns MongoDB collection
 */
async function getCollection (name) {
  let db = await getInstance()
  let collection = db.collection(name)
  return collection
}

module.exports = {
  initPool,
  getCollection
}
