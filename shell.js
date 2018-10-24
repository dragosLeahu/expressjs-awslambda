const db = require('./db')
const repository = require('./app/repository')
const notesValidator = require('./app/validators/notes')
const notesController = require('./app/controllers/notes')
const notesService = require('./app/services/notes')

// dependencies
let deps = {
  mongodb: require('mongodb'),
  config: require('./config/local'),
  joi: require('joi'),
  expressJoi: require('express-joi-validation')({}),
  constants: require('./app/utility/constants')
}

const shell = () => {
  const database = db(deps)

  const repo = repository(deps, database)

  const services = {
    notes: notesService(deps, repo)
  }

  const controllers = {
    notes: notesController(deps, services.notes)
  }

  const validators = {
    notes: notesValidator(deps)
  }

  return {
    db: database,
    repository: repo,
    services: services,
    controllers: controllers,
    validators: validators
  }
}

module.exports = shell
