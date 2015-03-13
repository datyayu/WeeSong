angular.module('weesong')
.controller('HeaderCtrl', function ($scope) {
/* Custom events */ 
  // Change the header text.
  $scope.$on('headerChangeTitle', function (_, title) {
    $scope.title = title;
  });


/* Scope functions */
  // Show / Hide menu.
  $scope.toggleMenu = function () {
    $scope.$emit('toggleMenu');
  };

  // Show / Hide playlist.
  $scope.togglePlaylist = function () {
    $scope.$emit('togglePlaylist');
  };
});