const { ObjectID } = require('mongodb')
const { getInstance } = require('../../db')
const d = require('../utility/debugger')('notes-repo')

async function create (title, description) {
  let db = await getInstance()
  let collection = db.collection('notes')
  let inserted = await collection.insertOne({ title, description })
  d(inserted.ops[0])
  return inserted.ops[0]
}

async function getAll (callback) {
  await getInstance.collection('notes').find({}).toArray((error, response) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, response)
    }
  })
}

async function getOne (req, callback) {
  await getInstance.collection('notes').find({
    _id: ObjectID(req.params.id)
  }).toArray((error, response) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, response[0])
    }
  })
}

async function updateOne (req, callback) {
  await getInstance.collection('notes').findOneAndUpdate({
    _id: ObjectID(req.params.id)
  }, {
    $set: req.body
  }, {
    returnOriginal: false
  },
  (error, response) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, response.value)
    }
  })
}

async function deleteOne (req, callback) {
  await getInstance.collection('notes').findOneAndDelete({
    _id: ObjectID(req.params.id)
  }, (error, response) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, response.value)
    }
  })
}

module.exports = { create, getAll, getOne, updateOne, deleteOne }
