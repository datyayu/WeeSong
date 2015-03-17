"use strict"

const path    = require('path')
const express = require('express')
const app     = express()

// Static files
const publicFiles = path.join(__dirname, 'public')
app.use(express.static(publicFiles))

// Routes
app.get('*', handleApp)

// Start listening
let port = process.env.PORT || 9000
app.listen(port, function () {
  console.log('[ Weesong ] - Running on port ' + port)
})

// Routes
function handleApp (req, res) {
  res.sendFile(path.join(__dirname, "public", "assets", "html", "index.html"))
}