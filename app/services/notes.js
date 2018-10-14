const repository = require('../repository')
const constants = require('../utility/constants')

async function createNote (data) {
  let inserted = await repository.insertOne(constants.dbCollections.NOTES, data)
  return inserted
}

async function getAllNotes () {
  let notes = await repository.findAll(constants.dbCollections.NOTES)
  return notes
}

async function getNoteById (id) {
  let note = await repository.findOne(constants.dbCollections.NOTES, id)
  return note
}

async function updateNoteById (id, data) {
  let updated = await repository.updateOneAndGet(constants.dbCollections.NOTES, id, data)
  return updated
}

async function deleteNoteById (id) {
  let deleted = await repository.deleteOne(constants.dbCollections.NOTES, id)
  return deleted
}

module.exports = { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById }
