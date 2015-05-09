express = require 'express'
path    = require 'path'
app     = express()


# Custom API
api = require './api'

# Static files (to be replaced with api)
assets    = path.join __dirname, 'public', 'assets'
dbFiles   = path.join __dirname, 'public', 'db'
indexFile = path.join __dirname, 'public', 'index.html'


# Config
app.use api
app.use '/assets', express.static(assets)
app.use '/db', express.static(dbFiles)

app.get '*', (req, res) -> res.sendFile indexFile


# Start listening
port = process.env.PORT or 9000

app.listen port, ->
  console.log "[ Weesong ] - Running on port #{ port }"
