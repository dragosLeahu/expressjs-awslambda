const  express = require('express'),
  router = express.Router(),
  NoteService = require('../services/NoteService')

router.post('/', function(req, res) {
  NoteService.createNote(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/', function(req, res) {
  NoteService.getAllNotes(function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/:id', function(req, res) {
  NoteService.getNoteById(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.put('/:id', function(req, res) {
  NoteService.updateNoteById(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.delete('/:id', function(req, res) {
  NoteService.deleteNoteById(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

module.exports = router
