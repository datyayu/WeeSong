angular.module('weesong')
.controller('PlaylistCtrl', function ($scope, PlaylistSvc, PlayerSvc) {
  $scope.playlist = {};

// Get playlist's JSON from server.
  PlaylistSvc.getPlaylist('/playlist.json').then(function (data) {
    $scope.playlist = data;
  });


// Play clicked song and move to the player page.
  $scope.play = function ($index) {
    PlayerSvc.setPlaylist($scope.playlist);
    PlayerSvc.playSongAt($index);

    $scope.$emit('pageChange', {id: 'player', url: '/player'});
  };

});