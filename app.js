'use strict'

require('dotenv').config({
  path: './variables.env'
})

const express = require('express'),
  app = express()

app.use(express.json()) // to support JSON-encoded bodies
app.use('/api/v1', require('./routes'))

module.exports = app