const router = require('express').Router()

//notes routes
router.use('/notes', require('./notes'))

module.exports = router