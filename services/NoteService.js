'use strict'

const connectToDatabase = require('../db'),
  Note = require('../models/Note')

module.exports.create = (req, callback) => {
  connectToDatabase()
    .then(() => {
      Note.create(req.body)
        .then(note => callback(null, {
          statusCode: 200,
          body: note
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }))
    })
}

module.exports.getAll = (req, callback) => {
  connectToDatabase()
    .then(() => {
      Note.find()
        .then(notes => callback(null, {
          statusCode: 200,
          body: notes
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    })
}

module.exports.getOne = (req, callback) => {
  connectToDatabase()
    .then(() => {
      Note.findById(req.params.id)
        .then(note => callback(null, {
          statusCode: 200,
          body: note
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the note.'
        }))
    })
}

module.exports.update = (req, callback) => {
  connectToDatabase()
    .then(() => {
      Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(note => callback(null, {
          statusCode: 200,
          body: note
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    })
}

module.exports.delete = (req, callback) => {
  connectToDatabase()
    .then(() => {
      Note.findByIdAndRemove(req.params.id)
        .then(note => callback(null, {
          statusCode: 200,
          body: { 
            message: 'Removed note with id: ' + note._id, 
            note: note 
          }
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    })
}