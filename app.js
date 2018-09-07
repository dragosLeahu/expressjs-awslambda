'use strict'

require('dotenv').config({ path: './variables.env' })

const express = require('express'),
  app = express(),
  morgan = require('morgan')

app.use(morgan('tiny'))
app.use(express.json())       // to support JSON-encoded bodies
app.use(require('./controllers'))

module.exports = app