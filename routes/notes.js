const router = require('express').Router()
const notesController = require('../app/controllers/notes')
const notesValidator = require('../app/validators/notes')
const c = require('../app/utility/controllerHandler')

router.post('/', notesValidator.createRule(), c(notesController.create, (req, res, next) => [req.body]))

router.get('/', c(notesController.getAll))

router.get('/:id', notesValidator.paramsRule(), c(notesController.getOne, (req, res, next) => [req.params.id]))

router.put('/:id', notesValidator.paramsRule(), notesValidator.updateRule(), c(notesController.updateOne, (req, res, next) => [req.params.id, req.body]))

router.delete('/:id', notesValidator.paramsRule(), c(notesController.deleteOne, (req, res, next) => [req.params.id]))

module.exports = router
