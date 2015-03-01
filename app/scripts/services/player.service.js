angular.module('weesong')
.service('PlayerSvc', function ($rootScope, PlaylistSvc) {
  var svc = this;

/* Export variables */
  var _player = document.getElementById('player');
  var _playlist = {};
  var _currentSong;


/* Player state variables */
  var _defaultPlaylist; // Create a copy before randomize it.
  var _index           = 0;
  var _playerIsLooped  = false;
  var _playerIsRandom  = false;
  var _playerIsPlaying = false;


/* Getters */
  svc.getCurrentSong    = function () { return _currentSong; };
  svc.getCurrentTime    = function () { return _player.currentTime; };
  svc.getDuration       = function () { return _player.duration; };
  svc.getIndex          = function () { return _index; };
  svc.getPlayer         = function () { return _player; };
  svc.getPlaylist       = function () { return _playlist.songs; };
  svc.getPlaylistInfo   = function () { return _playlist.info; };
  svc.getPlaylistLength = function () { return _playlist.songs.length; };
  svc.isPaused          = function () { return _player.paused; };
  svc.isPlaying         = function () { return _playerIsPlaying; };
  svc.isLooped          = function () { return _playerIsLooped; };
  svc.isRandomized      = function () { return _playerIsRamdom; };


/* Setters */
  svc.setPlaylist = function (playlist) {
   _playlist = playlist; 
  };

  svc.setCurrentTime = function (time) {
    _player.currentTime = time;
  }

  svc.toggleLoop = function (state) {
    _playerIsLooped = !_playerIsLooped;
  }

  svc.togglePlaylistShow = function () { 
    $rootScope.$broadcast('togglePlaylist');
  };

  svc.toggleRandom = function (state) {
    _playerIsRandom = !_playerIsRandom;
    svc.shufflePlaylist();
  }


/* Custom events */
  svc.onEvent = function (event, cb) {
    _player.addEventListener("timeupdate", cb, false);
  } 


/* Listeners */
  // Handle the end of the songs.
  _player.addEventListener('ended', function () {
    // Loop through the same song.
    if (_playerIsLooped) {
      svc.play();
    }
    // Keep playing the rest of the playlist.
    else if(_index !== (_playlist.songs.length - 1) ) {
      svc.playNext();
    }
    //Stop Playing since it reached the playlist's end.
    else {
      _playerIsPlaying = false;
      $rootScope.$broadcast('playlistEnd');
    }
  }, false);



/* Player manipulation methods */
  // Play pause the current song.
  svc.play = function () {
    if (_player.paused) {
      _player.play();
      _playerIsPlaying = true;
    } else {
      _player.pause();
      _playerIsPlaying = false;
    }
  };

  svc.pause = function () {
      _player.pause();
      _playerIsPlaying = false;
  };

  // Play next song on the playlist
  svc.playNext = function (scope) {
    if(_index < (_playlist.songs.length - 1) ) {
      _currentSong = _playlist.songs[++_index];
      reloadAudio(_currentSong);
    }
  }

  // Play prev song on the playlist
  svc.playPrev = function () {
    if(_index > 0 ) {
      _currentSong = _playlist.songs[--_index];
      reloadAudio(_currentSong);
    }
  }

  // Play the song at 'index' position in current playlist.
  svc.playSongAt = function (index) {
    _index       = index;
    _currentSong = _playlist.songs[index];
    _playerIsPlaying = true;

    reloadAudio(_currentSong);
  }

  // Shuffles / Unshuffles the playlist.
  svc.shufflePlaylist = function () {
    // Change to Shuffle State.
    if (_playerIsRandom ) {
      _defaultPlaylist = _.clone(_playlist.songs, true);
      _playlist.songs  = _.shuffle(_playlist.songs);
      _index           = _.find(_playlist.songs, _currentSong);
    } 
    // Back to normal state.
    else {
      _playlist.songs = _defaultPlaylist;
      _index          = _.find(_playlist.songs, _currentSong);
    }
  }


/* Utility functions */
  function reloadAudio (song) {
    _player.src = song.url; // Make sure it has the right song.
    _player.load();

    // _player.oncanplaythrough = function () {
    //   if (_playerIsPlaying) { _player.play(); }
    // }
    player.play(); 
    
  }
});