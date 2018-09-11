'use strict'

const Note = require('../models/Note'),
  ObjectID = require('mongodb').ObjectID

module.exports.create = (req, callback) => {
  Note(function(err, col) {
    col.insertOne(req.body, function(err, response) {
      if (err) {
        callback(err, null)
      } else {
        let insertedNote = note.ops
        callback(null, insertedNote)
      }
    })
  })
}

module.exports.getAll = (callback) => {
  Note(function(err, col) {
    col.find({}).toArray(function(err, response) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, response)
      }
    })
  })
}

module.exports.getOne = (req, callback) => {
  Note(function(err, col) {
    col.find({
      _id: ObjectID(req.params.id)
    }).toArray(function(err, response) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, response)
      }
    })
  })
}

module.exports.update = (req, callback) => {
  Note(function(err, col) {
    col.findOneAndUpdate({
        _id: ObjectID(req.params.id)
      }, {
        $set: req.body
      }, {
        returnOriginal: false
      },
      function(err, response) {
        if (err) {
          callback(err, null)
        } else {
          callback(null, response)
        }
      }
    )
  })
}

module.exports.delete = (req, callback) => {
  Note(function(err, col) {
    col.findOneAndDelete({
      _id: ObjectID(req.params.id)
    }, function(err, response) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, response)
      }
    })
  })
}