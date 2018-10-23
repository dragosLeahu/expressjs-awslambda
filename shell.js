const db = require('./db')
const repository = require('./app/repository')

// dependencies
let deps = {
  mongodb: require('mongodb'),
  config: require('./config/development')
}

const shell = () => {
  return {
    db: db(deps),
    repo: repository(deps, db)
  }
}

module.exports = shell
