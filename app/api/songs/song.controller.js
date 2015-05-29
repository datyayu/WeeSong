/*
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/releases              ->  index
 * POST    /api/releases              ->  create
 * GET     /api/releases/:id          ->  show
 * PUT     /api/releases/:id          ->  update
 * DELETE  /api/releases/:id          ->  destroy
 */

var moment = require('moment');
var Song   = require('./song.model');


function findAll (req, res) {
  Song
    .find({})
    .select('title artists id')
    .exec(function(err, songs) {
      if (err) return res.send(err);

      return res.send(songs);
    });
}


function create (req, res) {
  var newSong = req.body;

  Song
    .find({
      title: newSong.title,
      artists: newSong.artists,
      album: newSong.album
    })
    .exec(function(err, songs) {
      if (err) return res.send(err);
      if (songs.length > 0) return res.send('Song already exists');

      var song = new Song(newSong);
      song.createdAt = moment().unix();
      song.updatedAt = moment().unix();

      song.save(function (err, song) {
        res.send('song created: ' + song.title);
      });
    });
}


function findOne (req, res) {
  var songId = req.params.id;

  Song
    .findById(songId)
    .select('-__v -_id -updatedAt')
    .exec(function(err, song) {
      if (err) return res.send(err);

      return res.send(song);
    });
}


function updateOne (req, res) {
  songId      = req.params.id;
  updatedSong = req.body;

  Song
    .findById(songId)
    .exec(function(err, song) {
      if (err) return res.send(err);

      // Update info
      if (updatedSong.cover)     { song.cover     = updatedSong.cover;     }
      if (updatedSong.title)     { song.title     = updatedSong.title;     }
      if (updatedSong.album)     { song.album     = updatedSong.album;     }
      if (updatedSong.artists)   { song.artists   = updatedSong.artists;   }
      if (updatedSong.url)       { song.url       = updatedSong.url;       }
      if (updatedSong.createdAt) { song.createdAt = updatedSong.createdAt; }

      // Mandatory update log.
      song.updatedAt = moment().unix();

      song.save(function(err, song) {
        if (err) return res.send(err);

        res.send(song);
      });
    });
}


function deleteOne (req, res) {
  var songId = req.params.id;

  Song
    .find({_id: songId})
    .remove(function(err) {
      if (err) return res.send(err);

      res.send('Song removed');
    });
}



module.exports = {
  index: findAll,
  create: create,
  show: findOne,
  update: updateOne,
  destroy: deleteOne
};
