const notesRepository = require('../repositories/notes')
const formatResponse = require('../utility/formatResponse')

async function createNote (title, description) {
  let inserted = await notesRepository.create(title, description)
  return inserted
}

async function getAllNotes (callback) {
  await notesRepository
    .getAll((err, notes) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch notes.'), null)
      } else {
        callback(null, formatResponse(200, notes, 'Succesfully retreived notes.'))
      }
    })
}

async function getNoteById (req, callback) {
  await notesRepository
    .getOne(req, (err, note) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch the note.'), null)
      } else {
        callback(null, formatResponse(200, note, 'Succesfully retreived the note.'))
      }
    })
}

async function updateNoteById (req, callback) {
  await notesRepository
    .updateOne(req, (err, note) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch the note.'), null)
      } else {
        callback(null, formatResponse(200, note, 'Succesfully updated the note.'))
      }
    })
}

function deleteNoteById (req, callback) {
  notesRepository
    .deleteOne(req, (err, note) => {
      if (err) {
        callback(formatResponse(err.statusCode || 500, null, 'Could not fetch the note.'), null)
      } else {
        callback(null, formatResponse(200, note, 'Sucesfully deleted the note.'))
      }
    })
}

module.exports = { createNote, getAllNotes, getNoteById, deleteNoteById, updateNoteById }
