"use strict"

// Dependencies
const express = require('express')
const path    = require('path')
const router  = express.Router()


// Static files
const publicFiles = path.join(__dirname, '../public')

router.get('/assets/*', function (req, res) {
  let file = req.path.split('%20').join(' ');
  console.log(file)
  res.sendFile(publicFiles + file);
}) 
router.get('/db/*', function (req, res) {
  let file = req.path.split('%20').join(' ');
  console.log(file)
  res.sendFile(publicFiles + file);
}) 


// Routes declaration.
router.get('*', function (req, res) {
  let indexFile = path.join(__dirname, "../public/index.html")
 
  res.sendFile(indexFile)
})



// Exports
module.exports = router