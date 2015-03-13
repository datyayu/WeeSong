angular.module('weesong')
.controller('PlayerCtrl', function ($scope, $location, PlayerSvc) {
/* Variables*/
  /* Change title on load */
  $scope.$emit('changeTitle', 'Now Playing'); // Change header title.

  /* Player info variables */
  $scope.song        = PlayerSvc.getCurrentSong();
  $scope.elapsedTime = secondsToString(PlayerSvc.getCurrentTime());
  $scope.totalTime   = secondsToString(PlayerSvc.getDuration());
  
  /* Player state variables */
  $scope.isPlaying       = PlayerSvc.isPlaying();
  $scope.playerLooped    = false;
  $scope.playerShuffled  = false;


  /* Player elements variables. */
  var timeline        = document.getElementById('timeline');
  var currentTimeline = document.getElementById('currentProgress');

  /* Private variables */
  var audioTimer;

/* Update times on load */
  // Get time on load.
  $scope.$on('$routeChangeStart', function () {
    if ($location.path() === '/player') {
      updateTime();
    }
  });

  // Update info on song change.
  $scope.$on('changeSong', function () {
    $scope.isPlaying = PlayerSvc.isPlaying();
    $scope.song      = PlayerSvc.getCurrentSong();
  });


/* Events */
  // Handle the end of the songs.
  PlayerSvc.onEvent('ended', function () {
    //Stop Playing since it reached the playlist's end.
    if (PlayerSvc.isPaused() ){
      $scope.isPlaying = false;
    } 
    else if (PlayerSvc.getIndex() !== (PlayerSvc.getPlaylistLength() - 1) ) {
      $scope.isPlaying = true;
      $scope.song =  PlayerSvc.getCurrentSong();
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
    var currentProgress = e.pageX - timeline.getBoundingClientRect().left;
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
    } else {
      PlayerSvc.pause();
    }
    $scope.isPlaying = PlayerSvc.isPlaying();
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
  // Update the playerCtrl state to the one on the playerSvc.
  function updateTime () {
    var playPercent = 100 * (PlayerSvc.getCurrentTime() / PlayerSvc.getDuration());
      currentTimeline.style.width = playPercent + "%";

    $scope.$apply(function () {
      $scope.elapsedTime = secondsToString(PlayerSvc.getCurrentTime());

      // Get total duration time if it doesn't have it yet.
      if (isNaN($scope.totalTime)) {
        $scope.totalTime = secondsToString(PlayerSvc.getDuration());
      }
    });

    $scope.isPlaying = PlayerSvc.isPlaying();
  }

  // Convert from seconds to a string with the MIN:SEC format. 
  function secondsToString (seconds) {
    if (seconds !== undefined && !isNaN(seconds)) {
      var mins = Math.floor(seconds / 60);
      var secs = Math.ceil(seconds % 60);
      return( ("0" + mins.toString()).slice(-2) +  ":" +
            ("0" + secs.toString()).slice(-2)
          );
    } else {
      // If the service doesn't has any info yet, inform the user that has to wait.
      return "Loading..."; 
    }
  }
});
