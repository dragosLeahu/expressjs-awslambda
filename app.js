// dotenv should be called as fast as possible
require('dotenv').config()

const express = require('express')
const errorHandler = require('./app/middlewares/errorHandler')
const db = require('./db')

// connect to db
db.initPoolAsync()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use('/api/v1', require('./routes'))

// error handler
app.use(errorHandler())

module.exports = app
