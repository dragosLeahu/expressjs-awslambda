const  express = require('express'),
  router = express.Router(),
  NoteService = require('../services/NoteService')

router.post('/', function(req, res) {
  NoteService.create(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/', function(req, res) {
  NoteService.getAll(null, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/:id', function(req, res) {
  NoteService.getOne(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.put('/:id', function(req, res) {
  NoteService.update(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

router.delete('/:id', function(req, res) {
  NoteService.delete(req, function(err, data) {
    if(err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

module.exports = router
