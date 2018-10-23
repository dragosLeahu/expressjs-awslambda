const d = require('./app/utility/debugger')('db')

const db = (deps) => {
  let pooledDB

  /**
   *Initialize a new connection to the database and sets the database instance to a global variable used for pooling the connection.
   *
   */
  async function initPool () {
    const { MongoClient } = deps.mongodb
    const client = new MongoClient(deps.config.db.url, deps.config.db.options)
    let result = await client.connect()
    if (result) {
      let db = client.db(deps.config.db.name)
      pooledDB = db
      if (process.env.NODE_ENV === 'development') {
        d(`Connected to db ${deps.config.db.name}`)
      }
    }
  }

  /**
   * Initialize a new connection to the database and returns the database instance or just returns the database instance if already connected.
   *
   */
  async function getInstance () {
    if (!pooledDB) {
      await initPool()
    }
    return pooledDB
  }

  /**
   * Gets a collection from the database by name. Return the collection.
   *
   * @param {string} name
   */
  async function getCollection (name) {
    let db = await getInstance()
    let collection = db.collection(name)
    return collection
  }

  return {
    initPool,
    getCollection
  }
}

module.exports = db
