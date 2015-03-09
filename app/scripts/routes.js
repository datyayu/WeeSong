/* Dependencies */
angular.module('weesong', [
  'ngRoute'
]);

angular.module('weesong')
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/player',   {controller: 'PlayerCtrl',   templateUrl: 'layouts/player.html'  })
    .when('/playlists', {templateUrl: 'layouts/playlists.html'})
    .when('/playlists/:playlistID', {controller: 'PlaylistCtrl', templateUrl: 'layouts/playlist_individual.html'})

    /* Uncomment on prod */
    
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
});