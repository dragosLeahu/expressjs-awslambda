require('dotenv').config({
  path: './.env'
})
require('./db').initPool() // connect to db

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use('/api/v1', require('./routes'))

module.exports = app
