angular.module('weesong')
.controller('PlaylistBarCtrl', function ($scope, PlayerSvc) {
// Scope variables
  $scope.playlist = PlayerSvc.getPlaylist();
  $scope.index    = PlayerSvc.getIndex();

// Event Listeners
  $scope.$on('changeSong', function () {
    $scope.index = PlayerSvc.getIndex();
  });

  $scope.$on('playlistShuffled', function () {
    $scope.playlist = PlayerSvc.getPlaylist();
    $scope.index    = PlayerSvc.getIndex();
    console.log( $scope.index );
  });



// Player events.
  $scope.play = function (index) {
    if (index !== $scope.index) {
      $scope.index = index;
      PlayerSvc.playSongAt(index);
    }

    $scope.$emit('togglePlaylist');
  };
});