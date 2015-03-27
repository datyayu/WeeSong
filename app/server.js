"use strict"

// Dependencies
const express = require('express')
const app     = express()

// Custom API
const controllers = require('./controllers')


// Config
app.use(controllers)


// Start listening
let port = process.env.PORT || 9000
app.listen(port, function () {
  console.log('[ Weesong ] - Running on port ' + port)
})