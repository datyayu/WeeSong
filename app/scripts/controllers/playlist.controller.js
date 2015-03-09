angular.module('weesong')
.controller('PlaylistCtrl', function ($scope, PlaylistSvc, PlayerSvc, $routeParams) {
  $scope.playlist = {};

// Get playlist's JSON from server.
  PlaylistSvc.getPlaylist('db/'+ $routeParams.playlistID + '.json').then(function (data) {
    $scope.playlist = data;
  });


// Play clicked song and move to the player page.
  $scope.play = function ($index) {
    PlayerSvc.setPlaylist($scope.playlist);
    PlayerSvc.playSongAt($index);

    $scope.$emit('tabChange', {id: 'player', url: '/player'});
  };

});