const { ObjectID } = require('mongodb')
const { getCollection } = require('../../db')
const addTimestamp = require('../utility/addTimestamp')
const constants = require('../utility/constants')

async function create (data) {
  let collection = await getCollection('notes')
  let inserted = await collection.insertOne(addTimestamp(data, constants.CREATE))
  return inserted.ops[0]
}

async function getAll () {
  let collection = await getCollection('notes')
  let notes = await collection.find({}).toArray()
  return notes
}

async function getOne (id) {
  let collection = await getCollection('notes')
  let note = await collection.find({
    _id: ObjectID(id)
  }).toArray()
  return note[0]
}

async function updateOne (id, data) {
  let collection = await getCollection('notes')
  let updated = await collection.findOneAndUpdate({
    _id: ObjectID(id)
  }, {
    $set: addTimestamp(data, constants.UPDATE)
  }, {
    returnOriginal: false
  })
  return updated.value
}

async function deleteOne (id) {
  let collection = await getCollection('notes')
  let deleted = await collection.findOneAndDelete({
    _id: ObjectID(id)
  })
  return deleted.value
}

module.exports = { create, getAll, getOne, updateOne, deleteOne }
