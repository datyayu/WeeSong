angular.module('weesong')
.controller('PlaylistCtrl', 
  function ($scope, $routeParams, PlaylistSvc, PlayerSvc) {
    $scope.playlist = {};
    // console.log('hey')

  // When requesting a custom playlist
    if ($routeParams.playlistID) {
      PlaylistSvc
        .getPlaylist($routeParams.playlistID)
        .then(function (data) {
          $scope.playlist = data;
          $scope.$emit('changeTitle', data.info.title); // Set header title.
        });
    } 
  // When requesting a album/single-based playlist.
    else if ($routeParams.seriesID) {
      var url = $routeParams.seriesID + '_' + $routeParams.singleType;
      PlaylistSvc
        .getAlbum(url)
        .then(function (data) {
          $scope.playlist = data;
          $scope.$emit('changeTitle', data.info.title); // Set header title.
        })
    }


  // Play clicked song and move to the player page.
    $scope.play = function ($index) {
      PlayerSvc.setPlaylist($scope.playlist);
      PlayerSvc.playSongAt($index);

      $scope.$emit('changeUrl', '/player');
    };
  }
);