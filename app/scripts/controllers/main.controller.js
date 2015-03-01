/* Main Ctrl */
angular.module('weesong')
.controller('MainCtrl', function ($scope, $location) {
  $scope.pageTitle = "Weesong";
  $scope.showMenu = false;
  

/* Event Listeners */
  // Change the selected tab on menu and the page title.
  $scope.$on('pageChange', function (_, page) {
    $scope.showMenu = false;
    $location.path(page.url);

    if (page.text === undefined) {
      $scope.pageTitle = 'Now Playing'
    } else if (page.text === 'Wee') {
      $scope.pageTitle = page.text + 'song';
    } else {
      $scope.pageTitle = page.text;
    }
  });

  // Show/ Hide side menu.
  $scope.$on('toggleMenu', function () {
    $scope.showMenu = !$scope.showMenu;
  });

 /* Scope functions */
  $scope.hideMenu = function (e) {
    e.stopPropagation();

    $scope.showMenu = false;
  } 
});