/* Main Ctrl */
angular.module('weesong')
.controller('MainCtrl', function ($scope, $location, PlayerSvc) {
/* Controller variables */
  $scope.pageTitle = "Weesong";
  $scope.route = $location.path();
  $scope.showMenu = false;
  $scope.showPlaylist = false;
  

/* Event Listeners */
  // Change the selected tab on menu and the page title.
  $scope.$on('pageChange', function (_, page) {
    $scope.showMenu = false;
    $location.path(page.url);
    $scope.route = $location.path();

    if (page.text === undefined) {
      $scope.pageTitle = 'Now Playing'
    } else if (page.text === 'Wee') {
      $scope.pageTitle = page.text + 'song';
    } else {
      $scope.pageTitle = page.text;
    }
  });

  // Rebroadcast back to menu.
  $scope.$on('tabChange', function (_, tab) {
    $scope.$broadcast('changeTab', tab);
  })

  // Show/ Hide mobile menu.
  $scope.$on('toggleMenu', function () {
    $scope.showMenu = !$scope.showMenu;
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
  } 
});