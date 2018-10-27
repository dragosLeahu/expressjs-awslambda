const db = require('./db')
const repository = require('./app/repository')

const notesValidator = require('./app/validators/notes')
const authValidator = require('./app/validators/authValidator')

const notesController = require('./app/controllers/notes')
const authController = require('./app/controllers/authController')

const notesService = require('./app/services/notes')
const authService = require('./app/services/authService')

const authMiddleware = require('./app/middlewares/authMiddleware')

// dependencies
let deps = {
  mongodb: require('mongodb'),
  config: require('./config/local'),
  joi: require('joi'),
  expressJoi: require('express-joi-validation')({}),
  constants: require('./app/utility/constants'),
  bcrypt: require('bcrypt'),
  jwt: require('jsonwebtoken')
}

const shell = () => {
  const database = db(deps)

  const repo = repository(deps, database)

  const services = {
    notes: notesService(deps, repo),
    auth: authService(deps, repo)
  }

  const controllers = {
    notes: notesController(deps, services.notes),
    auth: authController(deps, services.auth)
  }

  const validators = {
    notes: notesValidator(deps),
    auth: authValidator(deps)
  }

  const middlewares = {
    auth: authMiddleware(deps)
  }

  return {
    db: database,
    repository: repo,
    services: services,
    controllers: controllers,
    validators: validators,
    middlewares: middlewares
  }
}

module.exports = shell
