angular.module('weesong')
.controller('PlayerCtrl', function ($scope, PlayerSvc) {
/* Variables*/
  /* Player state variables */
  $scope.song = PlayerSvc.getCurrentSong();
  $scope.playing = PlayerSvc.isPlaying();
  $scope.elapsedTime = secondsToString(PlayerSvc.getCurrentTime());
  $scope.totalTime = secondsToString(PlayerSvc.getDuration());
  $scope.playerLooped = false;
  $scope.playerShuffled = false;

  /* Player elements variables. */
  var timeline        = document.getElementById('timeline');
  var currentTimeline = document.getElementById('currentProgress');

  /* Private variables */
  var audioTimer;

/* Update times on load */
  updateTime();

/* Events */
  // Handle the end of the songs.
  PlayerSvc.onEvent('ended', function () {
    if (PlayerSvc.getIndex() !== (PlayerSvc.getPlaylistLength() - 1) ) {
      $scope.playing = true;
      $scope.song =  PlayerSvc.getCurrentSong();
    }
    //Stop Playing since it reached the playlist's end.
    else if (PlayerSvc.isPaused() ){
      $scope.playing = false;
    }
  }, false);


  // Update the bar on drag or click.
  PlayerSvc.onEvent("timeupdate", updateTime, false);
  
  // Update progress time while playing,
  PlayerSvc.onEvent("play", function () {
    audioTimer = setInterval(updateTime, 20);
  }, false);
  
  // Stop updating on pause
  PlayerSvc.onEvent("pause", function () {
    clearInterval(audioTimer);
  });


/* Make the progress bar clickeable */
  $scope.changeTrackPos = function (e) {
    var currentProgress = e.pageX - timeline.offsetLeft;
    var clickPercent = currentProgress / timeline.clientWidth;

    PlayerSvc.setCurrentTime(PlayerSvc.getDuration() * clickPercent);

    // Play when clicked if paused.
    if ( PlayerSvc.isPaused() ) { 
      PlayerSvc.play(); 
    }
  }


/* Controls handlers */
  // Play on click.
  $scope.play = function () {
    if ( PlayerSvc.isPaused() ) {
      PlayerSvc.play();
      $scope.playing = true;
    } else {
      PlayerSvc.pause();
      $scope.playing = false;
    }
  };

  // Play next song on the playlist
  $scope.playNext = function () {
    PlayerSvc.playNext();
    $scope.song = PlayerSvc.getCurrentSong();
  }

  // Play prev song on the playlist
  $scope.playPrev = function () {
    PlayerSvc.playPrev();
    $scope.song = PlayerSvc.getCurrentSong();
  }

  // Set Loop state.
  $scope.toggleLoop = function () {
    PlayerSvc.toggleLoop();
    $scope.playerLooped = ! $scope.playerLooped;
  }

  // Change shuffle state.
  $scope.toggleShuffle = function () {
    PlayerSvc.toggleRandom();
    $scope.playerShuffled = ! $scope.playerShuffled;
  }

/* Handle playlist */
  $scope.playOnClick = function ($index) {
    PlayerSvc.togglePlaylist();
    PlayerSvc.playSongAt($index);
    $scope.song = PlayerSvc.getCurrentSong();
  }


/* Utility functions */
  function updateTime () {
    var playPercent = 100 * (PlayerSvc.getCurrentTime() / PlayerSvc.getDuration());
      currentTimeline.style.width = playPercent + "%";

    $scope.$apply(function () {
      $scope.elapsedTime = secondsToString(PlayerSvc.getCurrentTime());

      if (isNaN($scope.totalTime)) {
        $scope.totalTime = secondsToString(PlayerSvc.getDuration());
      }
    });
  }

  function secondsToString (seconds) {
    if (seconds !== undefined && !isNaN(seconds)) {
      var mins = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      return( ("0" + mins.toString()).slice(-2) +  ":" +
            ("0" + secs.toString()).slice(-2)
          );
    } else {
      return "--:--"
    }
  }
});
