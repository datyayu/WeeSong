/* Main Ctrl */
angular.module('weesong')
.controller('MainCtrl', function ($scope, $location, PlayerSvc) {
/* Controller variables */
  $scope.route = $location.path();
  $scope.title = 'Weesong';
  $scope.showMenu = false;
  $scope.showPlaylist = false;  

/* Event Listeners */
  // Change the url and the active element on menu based on that.
  $scope.$on('changeUrl', function(_, url) {
    $scope.route    = url;
    $scope.showMenu = false;
    
    $location.path(url);
  });

  // Change the header title.
  $scope.$on('changeTitle', function (_, title) {
    $scope.$broadcast('headerChangeTitle', title);
    $scope.title = 'Weesong | ' + title;
  })

  // Show/ Hide mobile menu.
  $scope.$on('toggleMenu', function () {
    $scope.showMenu = !$scope.showMenu;
  });

  $scope.$on('hideMenus', function () {
    $scope.showMenu = false;
    $scope.showPlaylist = false;
  });

  // Show / hide playlist on player.
  $scope.$on('togglePlaylist', function () {
    $scope.showPlaylist = !$scope.showPlaylist;
  });

/* Scope functions */

  // Hide mobile menu.
  $scope.hideMenu = function (e) {
    e.stopPropagation();

    $scope.showMenu = false;
    $scope.showPlaylist = false;
  };
});