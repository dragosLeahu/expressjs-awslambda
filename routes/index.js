const router = require('express').Router()

router.use('/notes', require('./notes'))
router.use('/users', require('./auth'))

module.exports = router
