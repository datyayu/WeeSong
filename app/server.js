// Dependencies.
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var routes     = require('./routes');

// Module variables.
var app = express();


// Initiate database.
try {
  var url = process.env.MONGOLAB_URI || 'mongodb://localhost/song';
  mongoose.connect(url);
} catch (e) {
  return console.log ('Error loading db');
}

// Middleware.
app.use(bodyParser.json());
app.use(routes);


// Start listening.
var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('[ Weesong ] - Running on port ' + port);
});
