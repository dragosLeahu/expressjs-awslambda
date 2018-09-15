const router = require('express').Router()
const NotesController = require('../controllers/notes')
const validator = require('../middlewares/validators/notes')

router.post('/', validator.createRule(), NotesController.create)

router.get('/', NotesController.getAll)

router.get('/:id', validator.paramsRule(), NotesController.getOne)

router.put('/:id', validator.paramsRule(), validator.updateRule(), NotesController.update)

router.delete('/:id', validator.paramsRule(), NotesController.delete)

module.exports = router
