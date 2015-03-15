angular.module('weesong')
.controller('PlaylistsListCtrl', function ($scope, $location, PlaylistSvc) {
  $scope.$emit('changeTitle', 'Top Playlists'); // Set header title.
  $scope.playlists;

  // Get playlists from server.
  PlaylistSvc
    .getPlaylistsList()
    .then(function (data) {
      $scope.playlists = data;
    });

  // Open a playlist on click.
  $scope.openPlaylist = function (playlist) {
    $scope.$emit('changeUrl', '/playlists/' + playlist.id);
  };
})