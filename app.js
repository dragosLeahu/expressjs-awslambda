// dotenv should be called as fast as possible
require('dotenv').config()

const express = require('express')
const errorHandler = require('./app/middlewares/errorHandler')
const shell = require('./shell');

// connect to db
(async function () {
  await shell().db.initPool()
})()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use('/api/v1', require('./routes'))

// error handler
app.use(errorHandler())

module.exports = app
