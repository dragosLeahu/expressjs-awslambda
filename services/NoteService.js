'use strict'

const NoteRepository = require('../repositories/NoteRepository')

module.exports.createNote = (req, callback) => {
  NoteRepository
    .create(req, function(err, response) {
      if (err) {
        callback({
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not create the note.'
        }, null)
      } else {
        callback(null, {
          statusCode: 200,
          body: response
        })
      }
    })
}

module.exports.getAllNotes = (callback) => {
  NoteRepository
    .getAll(function(err, response) {
      if (err) {
        callback({
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the notes.'
        }, null)
      } else {
        callback(null, {
          statusCode: 200,
          body: response
        })
      }
    })
}

module.exports.getNoteById = (req, callback) => {
  NoteRepository
    .getOne(req, function(err, response) {
      if (err) {
        callback({
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the note.'
        }, null)
      } else {
        callback(null, {
          statusCode: 200,
          body: response
        })
      }
    })
}

module.exports.updateNoteById = (req, callback) => {
  NoteRepository
    .update(req, function(err, response) {
      if (err) {
        callback({
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the note.'
        }, null)
      } else {
        callback(null, {
          statusCode: 200,
          body: {
            message: 'Updated note with id: ' + response.value._id,
            note: response.value
          }
        })
      }
    })
}

module.exports.deleteNoteById = (req, callback) => {
  NoteRepository
    .delete(req, function(err, response) {
      if (err) {
        callback({
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the note.'
        }, null)
      } else {
        callback(null, {
          statusCode: 200,
          body: {
            message: 'Removed note with id: ' + response.value._id,
            note: response.value
          }
        })
      }
    })
}