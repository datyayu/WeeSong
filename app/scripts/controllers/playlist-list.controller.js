angular.module('weesong')
.controller('PlaylistsListCtrl', function ($scope, $location, PlaylistSvc) {
  $scope.playlists;

  // Get playlists from server.
  PlaylistSvc.getPlaylist('db/playlists.json').then(function (data) {
    $scope.playlists = data;
  });


  $scope.openPlaylist = function (id) {
    $location.path('/playlists/' + id);
  }
})