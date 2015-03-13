angular.module('weesong')
.controller('PlaylistCtrl', 
  function ($scope, $routeParams, PlaylistSvc, PlayerSvc) {
    $scope.playlist = {};

  // Get playlist's JSON from server.
    PlaylistSvc
      .getPlaylist('db/playlists/' + $routeParams.playlistID + '.json')
      .then(function (data) {
        $scope.playlist = data;
        $scope.$emit('changeTitle', data.info.title); // Set header title.
      });


  // Play clicked song and move to the player page.
    $scope.play = function ($index) {
      PlayerSvc.setPlaylist($scope.playlist);
      PlayerSvc.playSongAt($index);

      $scope.$emit('changeUrl', '/player');
    };
  }
);