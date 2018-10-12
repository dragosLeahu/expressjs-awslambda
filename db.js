const {
  MongoClient
} = require('mongodb')
const d = require('./app/utility/debugger')('db')
const config = require('./config/config')

const { name, url } = config.mongo
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
async function initPoolAsync () {
  const client = new MongoClient(url, options)
  let result = await client.connect()
  if (result) {
    let db = client.db(name)
    pooledDB = db
    d(`Connected to db ${name}`)
  }
}

/**
 * Initialize a new connection to the database and returns the database instance or just returns the database instance if already connected.
 *
 * @returns db
 */
async function getInstance () {
  if (!pooledDB) {
    await initPoolAsync()
  }
  return pooledDB
}

module.exports = {
  initPoolAsync,
  getInstance
}
