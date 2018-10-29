const db = require('./db')
const repository = require('./app/repository')

const notesValidator = require('./app/validators/notes')
const authValidator = require('./app/validators/authValidator')

const notesController = require('./app/controllers/notes')
const authController = require('./app/controllers/authController')

const notesService = require('./app/services/notes')
const authService = require('./app/services/authService')

const authMiddleware = require('./app/middlewares/authMiddleware')

const emailSender = require('./app/utility/emailSender')
const emailTemplates = require('./app/utility/emailTemplates')

// dependencies
let deps = {
  mongodb: require('mongodb'),
  config: require('./config/local'),
  joi: require('joi'),
  expressJoi: require('express-joi-validation')({}),
  constants: require('./app/utility/constants'),
  bcrypt: require('bcryptjs'),
  jwt: require('jsonwebtoken'),
  moment: require('moment'),
  cryptoRandomString: require('crypto-random-string'),
  debugger: require('./app/utility/debugger'),
  nodemailer: require('nodemailer')
}

const shell = () => {
  const database = db(deps)

  const repo = repository(deps, database)

  const util = {
    emailTemplates: emailTemplates(deps),
    emailSender: emailSender(deps)
  }

  const srvs = {
    notes: notesService(deps, repo),
    auth: authService(deps, repo, util.emailSender, util.emailTemplates)
  }

  const ctrls = {
    notes: notesController(deps, srvs.notes),
    auth: authController(deps, srvs.auth)
  }

  const valids = {
    notes: notesValidator(deps),
    auth: authValidator(deps)
  }

  const mwares = {
    auth: authMiddleware(deps)
  }

  return {
    db: database,
    repository: repo,
    services: srvs,
    controllers: ctrls,
    validators: valids,
    middlewares: mwares,
    utilities: util
  }
}

module.exports = shell
