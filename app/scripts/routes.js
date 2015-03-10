/* Dependencies */
angular.module('weesong', [
  'ngRoute'
]);

/* Routes */
angular.module('weesong')
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/player', {
      controller: 'PlayerCtrl',
      templateUrl: 'layouts/player.html'
    })
    .when('/playlists', {
      templateUrl: 'PlaylistListCtrl',
      templateUrl: 'layouts/playlists_list.html'
    })
    .when('/playlists/:playlistID', {
      controller: 'PlaylistCtrl', 
      templateUrl: 'layouts/playlist.html'
    })

});