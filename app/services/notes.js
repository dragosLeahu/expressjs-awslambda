const notesRepository = require('../repositories/notes')

async function createNote (title, description) {
  let inserted = await notesRepository.create(title, description)
  return inserted
}

async function getAllNotes () {
  let notes = await notesRepository.getAll()
  return notes
}

async function getNoteById (id) {
  let note = await notesRepository.getOne(id)
  return note
}

async function updateNoteById (id, data) {
  let updated = await notesRepository.updateOne(id, data)
  return updated
}

async function deleteNoteById (id) {
  let deleted = await notesRepository.deleteOne(id)
  return deleted
}

module.exports = { createNote, getAllNotes, getNoteById, deleteNoteById, updateNoteById }
