angular.module('weesong')
.controller('HeaderCtrl', function ($scope) {
  // Show / Hide menu.
  $scope.toggleMenu = function () {
    $scope.$emit('toggleMenu');
  };

  // Show / Hide playlist.
  $scope.togglePlaylist = function () {
    $scope.$emit('togglePlaylist');
  }
});