"use strict"

// Dependencies
const express = require('express')
const path    = require('path')
const router  = express.Router()


// Static files
const publicFiles = path.join(__dirname, '../public')
router.use('/assets', express.static(__dirname + '/../public/assets'));
router.use('/db', express.static(__dirname + '/../public/db'));



// Routes declaration.
router.get('*', function (req, res) {
  let indexFile = path.join(__dirname, "../public/index.html")
 
  res.sendFile(indexFile)
})



// Exports
module.exports = router