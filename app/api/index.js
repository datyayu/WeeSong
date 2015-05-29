// Dependencies.
var express = require('express');
var songs   = require('./songs');
// var series  = require('./series');

// Module variables.
var router = express.Router();


// API Routes.
router.use('/songs', songs);
// router.use('/series', series);


// Export router.sy
module.exports = router;
