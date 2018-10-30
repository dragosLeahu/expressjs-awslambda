const router = require('express').Router()
const c = require('../app/utility/controllerHandler')
const shell = require('../shell')
const authController = shell().controllers.auth
const authValidator = shell().validators.auth

// api/v1/users/register
router.post('/register', authValidator.registerRule(), c(authController.register, (req, res, next) => [req.body.email, req.body.password, req.body.passwordConfirm, req.body.roles]))

// api/v1/users/verify
router.get('/verify', c(authController.verify, (req, res, next) => [req.query.email, req.query.code]))

// api/v1/users/login
router.post('/login', authValidator.loginRule(), c(authController.login, (req, res, next) => [req.body.email, req.body.password]))

module.exports = router
