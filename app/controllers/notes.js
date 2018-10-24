const notesController = (deps, service) => {
  async function create (title, description) {
    let inserted = await service.createNote(title, description)
    return inserted
  }

  async function getAll () {
    let notes = await service.getAllNotes()
    return notes
  }

  async function getOne (id) {
    let note = await service.getNoteById(id)
    return note
  }

  async function updateOne (id, data) {
    let updated = await service.updateNoteById(id, data)
    return updated
  }

  async function deleteOne (id) {
    let deleted = await service.deleteNoteById(id)
    return deleted
  }

  return {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne
  }
}

module.exports = notesController
