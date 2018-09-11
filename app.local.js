'use strict'

const app = require('./app'),
  morgan = require('morgan'),
  port = process.env.PORT || 3000

app.use(morgan('dev'))

app.listen(port, () =>
  console.log(`Server is listening on port ${port}.`)
)