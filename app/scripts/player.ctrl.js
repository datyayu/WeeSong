angular.module('weesong')
.controller('PlayerCtrl', function ($rootScope, $scope, $route) {
// Get Current song from global scope / playlist.
  var defaultPlaylist = $rootScope.playlist.songs;  // For un-random
  $scope.index        = $rootScope.playlist.current;
  $scope.playlist     = $rootScope.playlist.songs.slice(); 
  $scope.song         = $scope.playlist[$scope.index];

/* Player elements. */
  $scope.player          = document.getElementById('player');
  $scope.playhead        = document.getElementById('playhead');
  $scope.timeline        = document.getElementById('timeline');
  $scope.currentTimeline = document.getElementById('currentProgress');

/* Player state variables */
  $scope.player.playing = false;
  $scope.player.elapsed = 0;
  $scope.player.total = 0;
  $scope.player.loop = false;

/* Private variables */
  var audioTimer;

/* Update time on load. */
  $scope.$on('$routeChangeSuccess', function () {
    $scope.player.elapsed = secondsToString(0);
    $scope.player.total   = secondsToString($scope.song.duration);
  });


/* Move the progress bar according to the played % */
  // Update the bar on drag or click.
  $scope.player.addEventListener("timeupdate", updateTime, false);
  // Update progress time while playing,
  $scope.player.addEventListener("play", function () {
    audioTimer = setInterval(updateTime, 20);
  }, false);
  // Stop updating on pause
  $scope.player.addEventListener("pause", function () {
    clearInterval(audioTimer);
  });


/* Make the progress bar clickeable */
  $scope.changeTrackPos = function (e) {
    var currentProgress = e.pageX - timeline.offsetLeft;
    var clickPercent = currentProgress / timeline.clientWidth;

    $scope.player.currentTime = $scope.player.duration * clickPercent;
    
    // Play when clicked if paused.
    if($scope.player.paused) { $scope.play(); }
  }

/* Handle the end of the songs. */
  $scope.player.addEventListener("ended", function () {
    $scope.$apply(function () {
      if ($scope.player.loop === true){
        // Loop through the same song.
        $scope.player.play();
      } else if($scope.index !== ($scope.playlist.length - 1) ) {  
        // Keep playing the rest of the playlist.
        $scope.playNext();
      } else {
        //Stop Playing since it reached the playlist's end.
        $scope.player.playing = false;
      }
    })
  }, false);

/* Controls handlers */ 
  // Play on click.
  $scope.play = function () {
    if ($scope.player.paused) {
      $scope.player.play();
      $scope.player.playing = true;
    } else {
      $scope.player.pause();
      $scope.player.playing = false;
    }
  };

  // Play next song on the playlist
  $scope.playNext = function () {
    if($scope.index < ($scope.playlist.length - 1) ) {
      $scope.song = $scope.playlist[++$scope.index];
      reloadAudio($scope.song);
    } 
  } 

  // Play prev song on the playlist
  $scope.playPrev = function () {
    if($scope.index > 0 ) {
      $scope.song = $scope.playlist[--$scope.index];
      reloadAudio($scope.song);
    }
  }

  // Set Loop state.
  $scope.setLoop = function () {
    $scope.player.loop = !$scope.player.loop;
  }

  $scope.setShuffle = function () {
    var currentSong = $scope.playlist[$scope.index].title;

    // Change shuffle state.
    $scope.player.shuffle = !$scope.player.shuffle;

    // On shuffle state.
    if ($scope.player.shuffle) {
      // Shuffle the playlist.
      $scope.playlist = shuffleArray($scope.playlist);
      
      // Get new index of the current song.
      $scope.index = findSong($scope.playlist, currentSong);

    }
    // Back to normal state.
    else {
      // Reset playlist to default.
      $scope.playlist = defaultPlaylist.slice();
      $scope.index = findSong($scope.playlist, currentSong);
    }
  }

/* Handle playlist */
  $scope.playOnClick = function ($index) {
    $scope.index = $index;
    $scope.player.playing = true;
    reloadAudio($scope.playlist[$scope.index]);
  }


/* Utility functions */
  function updateTime () {
    var playPercent = 100 * ($scope.player.currentTime / $scope.player.duration);
    $scope.currentTimeline.style.width = playPercent + "%";
    
    $scope.$apply(function () {
      $scope.player.elapsed = secondsToString($scope.player.currentTime)

      if (!$scope.player.total) {
        $scope.player.total = secondsToString($scope.song.duration);
      }
    });
  }

  function secondsToString (seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);

    return( ("0" + mins.toString()).slice(-2) +  ":" + 
            ("0" + secs.toString()).slice(-2) 
          );
  }

  function reloadAudio (song) {
    $scope.$emit('tabChange', {
      id: 'item1',
      text: song.title
    });

    $scope.player.src = song.url; // Make sure it has the right song.
    $scope.player.load();
    $scope.player.oncanplaythrough = function () {
      if ($scope.player.playing) { $scope.player.play(); }
    }
  }

  function shuffleArray(array) {
    var now = new Date();
    var seed = now.getMilliseconds();
    var currentIndex = array.length, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random(seed) * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      array = swapElements(array, randomIndex, currentIndex);
    }

    return array;
  }

  function swapElements(array, firstElement, secondElement) {
      var temporaryValue;

      temporaryValue = array[firstElement];
      array[firstElement] = array[secondElement];
      array[secondElement] = temporaryValue;

      return array;
  }

  function findSong(array, song) {
    var index;

    for (var i = 0; i < array.length; i++) {
      if (array[i].title === song) { 
        index = i;    
      }
    }

    return index;
  }

});