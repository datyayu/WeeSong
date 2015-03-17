const path    = require('path')
const express = require('express')
const app     = express()


// Static files
const publicFiles = path.join(__dirname, 'public')
app.use(express.static(publicFiles))


// Routes
app.get('*', handleApp)


// Start listening
app.listen(9000, function () {
  console.log('Listening on port ' + 9000)
})

// Routes
function handleApp (req, res) {
  res.sendFile(path.join(__dirname, "public", "assets", "html", "index.html"))
}