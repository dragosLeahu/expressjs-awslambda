const notesService = require('../services/notes')

async function create (title, description) {
  let inserted = await notesService.createNote(title, description)
  return inserted
}

function getAll (req, res) {
  notesService.getAllNotes((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

function getOne (req, res) {
  notesService.getNoteById(req, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

function updateOne (req, res) {
  notesService.updateNoteById(req, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

function deleteOne (req, res) {
  notesService.deleteNoteById(req, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports = { create, getAll, getOne, updateOne, deleteOne }
