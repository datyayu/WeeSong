"use strict"

// Dependencies
const express = require('express')
const router  = express.Router()

// Custom routes
const routes  = require('./static')



// Config
router.use('/', routes)


// Exports
module.exports = router