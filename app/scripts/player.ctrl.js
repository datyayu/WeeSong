angular.module('weesong')
.controller('PlayerCtrl', function ($rootScope, $scope) {
// Get Current song from global scope / playlist.
  $scope.song = $rootScope.currentSong; 


/* Player elements. */
  $scope.player          = document.getElementById('player');
  $scope.playhead        = document.getElementById('playhead');
  $scope.timeline        = document.getElementById('timeline');
  $scope.currentTimeline = document.getElementById('currentProgress');
  $scope.player.playing = false;


/* Private variables */
  var audioTimer;


/* Move the progress bar according to the played % */
  // Update the bar.
  // $scope.player.addEventListener("timeupdate", updateTime, false);

  // Update progress bar while playing,
  $scope.player.addEventListener("play", function () {
    audioTimer = setInterval(function () {
      var playPercent = 100 * ($scope.player.currentTime / $scope.player.duration);
      console.log(playPercent)
      $scope.currentTimeline.style.width = playPercent + "%";
    }, 20);
  }, false);

  // Stop updating on puase
  $scope.player.addEventListener("pause", function () {
    clearInterval(audioTimer);
  });

/* Make the progress bar clickeable */
  $scope.changeTrackPos = function (e) {
    var clickPercent = (e.pageX - timeline.offsetLeft) / timeline.clientWidth;
    console.log(clickPercent)
    $scope.player.currentTime = $scope.player.duration * clickPercent;
  }

/* Make the playhead draggable */
  


/* Controls handlers */ 
  // Return the button to play icon on song end.
  $scope.player.addEventListener("ended", function () {
    $scope.$apply(function () {
      $scope.player.playing = false;
    })
  }, false);

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

});