const formatResponse = require('../utility/formatResponse')
const NotesRepository = require('../repositories/NotesRepository')

module.exports.createNote = (req, callback) => {
  NotesRepository
    .create(req, (err, note) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not create the note.'), null)
      } else {
        callback(null, formatResponse(200, note, 'Succesfully created note.'))
      }
    })
}

module.exports.getAllNotes = (callback) => {
  NotesRepository
    .getAll((err, notes) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch notes.'), null)
      } else {
        callback(null, formatResponse(200, notes, 'Succesfully retreived notes.'))
      }
    })
}

module.exports.getNoteById = (req, callback) => {
  NotesRepository
    .getOne(req, (err, note) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch the note.'), null)
      } else {
        callback(null, formatResponse(200, note, 'Succesfully retreived the note.'))
      }
    })
}

module.exports.updateNoteById = (req, callback) => {
  NotesRepository
    .update(req, (err, note) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch the note.'), null)
      } else {
        callback(null, formatResponse(200, note, 'Succesfully updated the note.'))
      }
    })
}

module.exports.deleteNoteById = (req, callback) => {
  NotesRepository
    .delete(req, (err, note) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch the note.'), null)
      } else {
        callback(null, formatResponse(200, note, 'Sucesfully deleted the note.'))
      }
    })
}
