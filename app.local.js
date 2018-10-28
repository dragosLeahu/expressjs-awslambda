const app = require('./app')
const logger = require('morgan')
const d = require('./app/utility/debugger')('app.local.js')
const config = require('./config/local')

const port = config.app.port

app.use(logger('dev'))

app.listen(port, () => d(`Server is listening on port ${port}.`))
