angular.module('weesong')
.controller('HeaderCtrl', function ($scope) {
  $scope.toggleMenu = function () {
    $scope.$emit('toggleMenu');
  };
});