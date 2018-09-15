const NotesService = require('../services/notes')

module.exports.create = (req, res) => {
  NotesService.createNote(req, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.getAll = (req, res) => {
  NotesService.getAllNotes((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.getOne = (req, res) => {
  NotesService.getNoteById(req, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.update = (req, res) => {
  NotesService.updateNoteById(req, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.delete = (req, res) => {
  NotesService.deleteNoteById(req, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}
