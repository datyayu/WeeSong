angular.module('weesong')
.service('PlayerSvc', function ($rootScope, PlaylistSvc) {
  var svc = this;

/* Export variables */
  var _player   = document.getElementById('player');
  var _playlist = {};
  var _index    = 0;
  var _currentSong;


/* Player state variables */
  var _defaultPlaylist; // Create a copy before randomize it.
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
  svc.isShuffled        = function () { return _playerIsRandom; };


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
  };


/* Add custom events on Player */
  svc.onEvent = function (e, cb) {
    _player.addEventListener(e, cb, false);
  };


/* Listeners */
  // Handle the end of the songs.
  _player.addEventListener('ended', function () {
    // Loop through the same song.
    if ( _playerIsLooped ) {
      svc.play();
    }
    // Keep playing the rest of the playlist.
    else if ( _index !== (_playlist.songs.length - 1) ) {
      svc.playNext();
    }
    //Stop Playing since it reached the playlist's end.
    else {
      _playerIsPlaying = false;
      $rootScope.$broadcast('playlistEnd');
    }
  }, false);



/* Player manipulation methods */
  // Play/pause the current song.
  svc.play = function () {
    if ( _player.paused ) {
      _player.play();
      _playerIsPlaying = true;
    } else {
      _player.pause();
      _playerIsPlaying = false;
    }
  };


  // Pause the current song.
  svc.pause = function () {
      _player.pause();
      _playerIsPlaying = false;
  };


  // Play next song on the playlist
  svc.playNext = function (scope) {
    if ( _index < (_playlist.songs.length - 1) ) {
      _currentSong = _playlist.songs[++_index];
      reloadAudio(_currentSong);
    }
  };


  // Play prev song on the playlist
  svc.playPrev = function () {
    if ( _index > 0 ) {
      _currentSong = _playlist.songs[--_index];
      reloadAudio(_currentSong);
    } else {
      _player.currentTime = 0;
    }
  };


  // Play the song at 'index' position in current playlist.
  svc.playSongAt = function (index) {
    _index       = index;
    _currentSong = _playlist.songs[index];

    reloadAudio(_currentSong);
  };


  // Shuffles / Unshuffles the playlist.
  svc.shufflePlaylist = function () {
    // Change to Shuffle State.
    if ( _playerIsRandom ) {
      _defaultPlaylist = _.clone(_playlist.songs, true);
      _playlist.songs  = _.shuffle(_playlist.songs);
      _index           = _.findIndex(_playlist.songs, _currentSong);
    } 
    // Back to normal state.
    else {
      _playlist.songs = _defaultPlaylist;
      _index          = _.findIndex(_playlist.songs, _currentSong);
    }


    // Broadcast a event to update playlist on controllers.
    $rootScope.$broadcast('playlistShuffled');
  };



/* Utility functions */
  function reloadAudio (song) {
    _player.src = song.url; // Make sure it has the right song.
    _player.load();
    _playerIsPlaying = true;
    _player.play(); 
    
    $rootScope.$broadcast('changeSong');
  };
});