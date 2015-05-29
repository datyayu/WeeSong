// Dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


// Episode Schema
var songSchema = new Schema({
  cover: String,
  miniature: String,
  url: String,

  number: Number,
  title: String,
  artists: [String],
  album: String,


  series: {
    type: Schema.Types.ObjectId,
    ref: 'Series'
  },

  createdAt: Number,
  updatedAt: Number
});



// Export model
var Song = mongoose.model('Song', songSchema);

module.exports = Song;
