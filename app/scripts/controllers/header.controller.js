angular.module('weesong')
.controller('HeaderCtrl', function ($scope) {
  $scope.toggleMenu = function () {
    $scope.$emit('toggleMenu');
  };

  $scope.togglePlaylist = function () {
    $scope.$emit('togglePlaylist');
  }
});