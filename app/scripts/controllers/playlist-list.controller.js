angular.module('weesong')
.controller('PlaylistsListCtrl', function ($scope, PlaylistSvc) {
  $scope.playlists;

  // Get playlists from server.
  PlaylistSvc.getPlaylist('db/playlists.json').then(function (data) {
    $scope.playlists = data;
  });
})