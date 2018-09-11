const NoteService = require('../services/NoteService')

module.exports.create = (req, res) => {
  NoteService.createNote(req, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.getAll = (req, res) => {
  NoteService.getAllNotes(function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.getOne = (req, res) => {
  NoteService.getNoteById(req, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.update = (req, res) => {
  NoteService.updateNoteById(req, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

module.exports.delete = (req, res) => {
  NoteService.deleteNoteById(req, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}