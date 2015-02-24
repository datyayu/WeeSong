angular.module('weesong')
.controller('PlaylistCtrl', function ($rootScope, $scope, $http, $location) {
  // Get playlist's JSON from server.
  $http({url: 'playlist.json'}).success(function (data) {
    $rootScope.playlist.songs = $scope.playlist = data;
  });

  // Play clicked song and move to the player page.
  $scope.play = function ($index) {
    $rootScope.playlist.current = $index;

    $scope.$emit('tabChange', {
      id: 'item1',
      text: $rootScope.playlist.songs[$index].title
    });
    
    $location.path('/player');
  }
});