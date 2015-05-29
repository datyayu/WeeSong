// Dependencies.
var path    = require('path');
var express = require('express');
var api     = require('./api');


// Module variables.
var router = express();

// Static files (to be replaced with api).
var assets    = path.join(__dirname, 'public', 'assets');
var dbFiles   = path.join(__dirname, 'public', 'db');
var indexFile = path.join(__dirname, 'public', 'assets', 'html','index.html');


// Config.
router.use('/api', api);
router.use('/assets', express.static(assets));
router.use('/db', express.static(dbFiles));

// Angular app.
router.get('*', function(req, res) {
  res.sendFile(indexFile);
});


// Export router.
module.exports = router;
