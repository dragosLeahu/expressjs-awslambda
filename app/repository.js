const { ObjectID } = require('mongodb')
const { getCollection } = require('./../db')
const addTimestamp = require('./utility/addTimestamp')
const constants = require('./utility/constants')

/**
 * Inserts one document into the specified collection. Returns the inserte document. Timestamp true by default, can be set to false if you want to insert without a timestamp.
 *
 * @param {string} collectionName
 * @param {JSON} data
 * @param {boolean} timestamp
 */
async function insertOne (collectionName, data, timestamp = true) {
  let collection = await getCollection(collectionName)
  let inserted
  if (timestamp === true) {
    inserted = await collection.insertOne(addTimestamp(data, constants.dbActions.CREATE))
  } else {
    inserted = await collection.insertOne(data)
  }
  return inserted.ops[0]
}

/**
 * Inserts multiple documents into the specified collection. Returns the inserted document. Timestamp true by default, can be set to false if you want to insert without a timestamp.
 *
 * @param {string} collectionName
 * @param {JSON} data
 * @param {boolean} timestamp
 */
async function insertMany (collectionName, data, timestamp = true) {
  let collection = await getCollection(collectionName)
  let inserted
  if (timestamp === true) {
    inserted = await collection.insertMany(addTimestamp(data, constants.dbActions.CREATE))
  } else {
    inserted = await collection.insertMany(data)
  }
  return inserted.ops
}

/**
 * Returns one document from the database.
 *
 * @param {string} collectionName
 * @param {number} id
 */
async function findOne (collectionName, id) {
  let collection = await getCollection(collectionName)
  let note = await collection.findOne({
    _id: ObjectID(id)
  })
  return note
}

/**
 * Returns one document from the database.
 *
 * @param {string} collectionName
 * @param {number} id
 * @param {JSON} includeFields
 */
async function findOneIncludeFields (collectionName, id, includeFields) {
  let collection = await getCollection(collectionName)
  let note = await collection.findOne({
    _id: ObjectID(id)
  }, { fields: includeFields }).toArray()
  return note[0]
}

/**
 * Retrieves all documents of a collection. Returns an array.
 *
 * @param {string} collectionName
 */
async function findAll (collectionName) {
  let collection = await getCollection(collectionName)
  let notes = await collection.find({}).toArray()
  return notes
}

/**
 * Retrieves all documents and limits them to a specified number. Returns an array.
 *
 * @param {string} collectionName
 * @param {number} limit
 */
async function findAllWithLimit (collectionName, limit) {
  let collection = await getCollection(collectionName)
  let notes = await collection.find({}).limit(limit).toArray()
  return notes
}

/**
 * Updates a document by id, from a specified collection and returns the updated document. Timestamp true by default, can be set to false if you want to udapte without a timestamp.
 *
 * @param {string} collectionName
 * @param {number} id
 * @param {JSON} data
 */
async function updateOneAndGet (collectionName, id, data, timestamp = true) {
  let collection = await getCollection(collectionName)
  let updated = await collection.findOneAndUpdate({
    _id: ObjectID(id)
  }, {
    $set: timestamp === true ? addTimestamp(data, constants.dbActions.UPDATE) : data
  }, {
    returnOriginal: false
  })
  return updated.value
}

/**
 * Updates multiple documents by id, from a specified collection and returns the updated documents. Timestamp true by default, can be set to false if you want to update without a timestamp.
 *
 * @param {string} collectionName
 * @param {number} id
 * @param {JSON} data
 */
async function updateMany (collectionName, id, data, timestamp = true) {
  let collection = await getCollection(collectionName)
  let updated = await collection.updateMany({
    _id: ObjectID(id)
  }, {
    $set: timestamp === true ? addTimestamp(data, constants.dbActions.UPDATE) : data
  }, {
    returnOriginal: false
  })
  return updated.value
}

/**
 * Finds and delete a document by id from a specified collection. Returns the deleted object.
 *
 * @param {string} collectionName
 * @param {number} id
 */
async function deleteOne (collectionName, id) {
  let collection = await getCollection(collectionName)
  let deleted = await collection.findOneAndDelete({
    _id: ObjectID(id)
  })
  return deleted.value
}

/**
 * Finds and delete a multiple documents by id from a specified collection. Returns the deleted objects.
 *
 * @param {string} collectionName
 * @param {number} id
 */
async function deleteMany (collectionName, id) {
  let collection = await getCollection(collectionName)
  let deleted = await collection.deleteMany({
    _id: ObjectID(id)
  })
  return deleted.value
}

module.exports = { insertOne, insertMany, findOne, findOneIncludeFields, findAll, findAllWithLimit, updateOneAndGet, updateMany, deleteOne, deleteMany }
