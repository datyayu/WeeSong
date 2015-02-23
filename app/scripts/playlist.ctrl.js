angular.module('weesong')
.controller('PlaylistCtrl', function ($rootScope, $scope, $http, $location) {
  // Get playlist's JSON from server.
  $http({url: 'playlist.json'}).success(function (data) {
    $rootScope.playlist = $scope.playlist = data;
  });

  // Play clicked song and move to the player page.
  $scope.play = function (song) {
    $rootScope.currentSong = song;

    $scope.$emit('tabChange', {
      id: 'item1',
      text: song.title
    });
    $location.path('/player');
  }
});