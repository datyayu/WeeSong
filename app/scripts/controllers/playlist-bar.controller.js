angular.module('weesong')
.controller('PlaylistBarCtrl', function ($scope, PlayerSvc) {
// Scope variables
  $scope.playlist = PlayerSvc.getPlaylist();
  $scope.index    = PlayerSvc.getIndex();

// Event Listeners
  // On new song.
  $scope.$on('changeSong', function () {
    $scope.index = PlayerSvc.getIndex();
  });

  // On list shuffled / shuffle active.
  $scope.$on('playlistShuffled', function () {
    $scope.playlist = PlayerSvc.getPlaylist();
    $scope.index    = PlayerSvc.getIndex();
  });



// Player events.
  // Play only if the clicked song isnt already playing.
  $scope.play = function (index) {
    if (index !== $scope.index) {
      $scope.index = index;
      PlayerSvc.playSongAt(index);

      $scope.$emit('togglePlaylist');
    }
  };
});