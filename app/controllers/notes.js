const notesService = require('../services/notes')

async function create (title, description) {
  let inserted = await notesService.createNote(title, description)
  return inserted
}

async function getAll () {
  let notes = await notesService.getAllNotes()
  return notes
}

async function getOne (id) {
  let note = await notesService.getNoteById(id)
  return note
}

async function updateOne (id, data) {
  let updated = await notesService.updateNoteById(id, data)
  return updated
}

async function deleteOne (id) {
  let deleted = await notesService.deleteNoteById(id)
  return deleted
}

module.exports = { create, getAll, getOne, updateOne, deleteOne }
