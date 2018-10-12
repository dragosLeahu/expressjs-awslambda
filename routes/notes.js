const router = require('express').Router()
const notesController = require('../app/controllers/notes')
const notesValidator = require('../app/validators/notes')
const c = require('../app/utility/controllerHandler')

router.post('/', notesValidator.createRule(), c(notesController.create, (req, res, next) => [req.body.title, req.body.description]))

// router.get('/', notesController.getAll)
//
// router.get('/:id', NotesRequestValidator.paramsRule(), notesController.getOne)
//
// router.put('/:id', NotesRequestValidator.paramsRule(), NotesRequestValidator.updateRule(), notesController.updateOne)
//
// router.delete('/:id', NotesRequestValidator.paramsRule(), notesController.deleteOne)

module.exports = router
