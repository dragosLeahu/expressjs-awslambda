const router = require('express').Router(),
  NoteController = require('../../controllers/NoteController')

router.post('/', function(req, res) {
  NoteController.create(req, res)
})

router.get('/', function(req, res) {
  NoteController.getAll(req, res)
})

router.get('/:id', function(req, res) {
  NoteController.getOne(req, res)
})

router.put('/:id', function(req, res) {
  NoteController.update(req, res)
})

router.delete('/:id', function(req, res) {
  NoteController.delete(req, res)
})

module.exports = router