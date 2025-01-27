const router = require('express').Router()
const c = require('../app/middlewares/controllerHandler')
const shell = require('../shell')
const notesController = shell().controllers.notes
const notesValidator = shell().validators.notes
const authMiddleware = shell().middlewares.auth

router.post('/', notesValidator.createRule(), authMiddleware.isAuth('admin'), c(notesController.create, (req, res, next) => [req.body.title, req.body.description]))

router.get('/', c(notesController.getAll))

router.get('/:id', notesValidator.paramsRule(), c(notesController.getOne, (req, res, next) => [req.params.id]))

router.put('/:id', notesValidator.paramsRule(), notesValidator.updateRule(), c(notesController.updateOne, (req, res, next) => [req.params.id, req.body]))

router.delete('/:id', notesValidator.paramsRule(), c(notesController.deleteOne, (req, res, next) => [req.params.id]))

module.exports = router
