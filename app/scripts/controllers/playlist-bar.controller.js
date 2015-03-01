angular.module('weesong')
.controller('PlaylistBarCtrl', function ($scope, PlayerSvc) {
// Scope variables
  $scope.playlist = PlayerSvc.getPlaylist();
  $scope.index    = PlayerSvc.getIndex();

// Player events.
  $scope.play = function ($index) {
    $scope.index = $index;
    PlayerSvc.play($index);
  };
});