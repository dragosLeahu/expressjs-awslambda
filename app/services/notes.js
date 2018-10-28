const service = (deps, repository) => {
  async function createNote (title, description) {
    let data = {
      title,
      description
    }

    let inserted = await repository.insertOne(deps.constants.dbCollections.NOTES, data)
    return inserted
  }

  async function getAllNotes () {
    let notes = await repository.findAll(deps.constants.dbCollections.NOTES)
    return notes
  }

  async function getNoteById (id) {
    let note = await repository.findOne(deps.constants.dbCollections.NOTES, id)
    return note
  }

  async function updateNoteById (id, data) {
    let updated = await repository.updateOneAndGet(deps.constants.dbCollections.NOTES, id, data)
    return updated
  }

  async function deleteNoteById (id) {
    let deleted = await repository.deleteOne(deps.constants.dbCollections.NOTES, id)
    return deleted
  }

  return {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
  }
}

module.exports = service
