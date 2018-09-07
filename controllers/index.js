var express = require('express'),
  router = express.Router()

router.use('/notes', require('./NoteController'))

module.exports = router