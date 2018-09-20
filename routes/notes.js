const router = require('express').Router()
const NotesController = require('../app/controllers/NotesController')
const NotesRequestValidator = require('../app/validators/NotesRequestValidator')

router.post('/', NotesRequestValidator.createRule(), NotesController.create)

router.get('/', NotesController.getAll)

router.get('/:id', NotesRequestValidator.paramsRule(), NotesController.getOne)

router.put('/:id', NotesRequestValidator.paramsRule(), NotesRequestValidator.updateRule(), NotesController.update)

router.delete('/:id', NotesRequestValidator.paramsRule(), NotesController.delete)

module.exports = router
