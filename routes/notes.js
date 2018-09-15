const router = require('express').Router();
const NotesController = require('../controllers/notes');

router.post('/', NotesController.create);

router.get('/', NotesController.getAll);

router.get('/:id', NotesController.getOne);

router.put('/:id', NotesController.update);

router.delete('/:id', NotesController.delete);

module.exports = router;
