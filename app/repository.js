const { ObjectID } = require('mongodb')
const addTimestamp = require('./utility/addTimestamp')
const constants = require('./utility/constants')

const repository = (deps, db) => {
  /**
 * Inserts one document into the specified collection. Returns the inserte document. Timestamp true by default, can be set to false if you want to insert without a timestamp.
 *
 * @param {string} collectionName
 * @param {Object} data
 * @param {boolean} timestamp
 */
  async function insertOne (collectionName, data, timestamp = true) {
    if (collectionName && data) {
      let collection = await db.getCollection(collectionName)
      let inserted
      if (timestamp) {
        let dataWithTime = addTimestamp(data, constants.dbActions.CREATE)
        inserted = await collection.insertOne(dataWithTime)
      } else {
        inserted = await collection.insertOne(data)
      }
      return inserted.ops[0]
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Inserts multiple documents into the specified collection. Returns the inserted document. Timestamp true by default, can be set to false if you want to insert without a timestamp.
   *
   * @param {string} collectionName
   * @param {Object} data
   * @param {boolean} timestamp
   */
  async function insertMany (collectionName, data, timestamp = true) {
    if (collectionName && data) {
      let collection = await db.getCollection(collectionName)
      let inserted
      if (timestamp === true) {
        let dataWithTime = addTimestamp(data, constants.dbActions.CREATE)
        inserted = await collection.insertMany(dataWithTime)
      } else {
        inserted = await collection.insertMany(data)
      }
      return inserted.ops
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Returns one document from the database.
   *
   * @param {string} collectionName
   * @param {number} id
   */
  async function findOne (collectionName, criteria) {
    if (collectionName && criteria) {
      let collection = await db.getCollection(collectionName)
      let result = await collection.findOne(criteria)
      return result
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Returns one document from the database.
   *
   * @param {string} collectionName
   * @param {number} id
   * @param {Object} includeFields example:{field1: 1, field2: 1} where 1 means include that field
   */
  async function findOneIncludeOnlyFields (collectionName, id, includeFields) {
    if (collectionName && id && includeFields) {
      let collection = await db.getCollection(collectionName)
      let note = await collection.find({
        _id: ObjectID(id)
      }).project(includeFields).toArray()
      return note[0]
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Retrieves all documents of a collection. Returns an array.
   *
   * @param {string} collectionName
   */
  async function findAll (collectionName) {
    if (collectionName) {
      let collection = await db.getCollection(collectionName)
      let notes = await collection.find({}).toArray()
      return notes
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Retrieves all documents and limits them to a specified number. Returns an array.
   *
   * @param {string} collectionName
   * @param {number} limit
   */
  async function findAllWithLimit (collectionName, limit) {
    if (collectionName && limit) {
      let collection = await db.getCollection(collectionName)
      let notes = await collection.find({}).limit(limit).toArray()
      return notes
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Updates a document by id, from a specified collection and returns the updated document. Timestamp true by default, can be set to false if you want to udapte without a timestamp.
   *
   * @param {string} collectionName
   * @param {number} id
   * @param {JSON} data
   */
  async function updateOneAndGet (collectionName, id, data, timestamp = true) {
    if (collectionName && id && data) {
      let collection = await db.getCollection(collectionName)
      if (timestamp) {
        let updated = await collection.findOneAndUpdate({
          _id: ObjectID(id)
        }, {
          $currentDate: {
            updatedAt: true
          },
          $set: data
        }, {
          returnOriginal: false
        })
        return updated.value
      } else {
        let updated = await collection.findOneAndUpdate({
          _id: ObjectID(id)
        }, {
          $set: data
        }, {
          returnOriginal: false
        })
        return updated.value
      }
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Updates multiple documents by id, from a specified collection and returns the updated documents. Timestamp true by default, can be set to false if you want to update without a timestamp.
   *
   * @param {string} collectionName
   * @param {number} id
   * @param {JSON} data
   */
  async function updateMany (collectionName, criteria, data, timestamp = true) {
    if (collectionName && criteria && data) {
      let collection = await db.getCollection(collectionName)
      let updated

      if (timestamp) {
        updated = await collection.updateMany({ title: 'Testing title' }, {
          $currentDate: {
            updatedAt: true
          },
          $set: data
        }, {
          returnOriginal: false
        })
      } else {
        updated = await collection.updateMany(criteria, {
          $set: data
        }, {
          returnOriginal: false
        })
      }

      return updated.result
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Finds and delete a document by id from a specified collection. Returns the deleted object.
   *
   * @param {string} collectionName
   * @param {number} id
   */
  async function deleteOne (collectionName, id) {
    if (collectionName && id) {
      let collection = await db.getCollection(collectionName)
      let deleted = await collection.findOneAndDelete({
        _id: ObjectID(id)
      })
      return deleted.value
    } else {
      throw new Error('Missing params')
    }
  }

  /**
   * Finds and delete a multiple documents by id from a specified collection. Returns the deleted objects.
   *
   * @param {string} collectionName
   * @param {number} id
   */
  async function deleteMany (collectionName, criteria) {
    if (collectionName && criteria) {
      let collection = await db.getCollection(collectionName)
      let deleted = await collection.deleteMany(criteria)
      return deleted.result
    } else {
      throw new Error('Missing params')
    }
  }

  /**
 * Finds and delete a multiple documents by id from a specified collection. Returns the deleted objects.
 *
 * @param {string} collectionName
 * @param {number} id
 */
  async function deleteAll (collectionName) {
    if (collectionName) {
      let collection = await db.getCollection(collectionName)
      let deleted = await collection.deleteMany({})
      return deleted.result
    } else {
      throw new Error('Missing params')
    }
  }

  return {
    insertOne,
    insertMany,
    findOne,
    findOneIncludeOnlyFields,
    findAll,
    findAllWithLimit,
    updateOneAndGet,
    updateMany,
    deleteOne,
    deleteMany,
    deleteAll
  }
}

module.exports = repository
