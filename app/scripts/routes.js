/* Dependencies */
angular.module('weesong', [
  'ngRoute'
]);


/* Routes */
angular.module('weesong')
.config(function ($routeProvider) {
  $routeProvider
    // Player route.
    .when('/player', {
      controller: 'PlayerCtrl',
      templateUrl: 'layouts/player.html'
    })

    // Playlist-related routes.
    .when('/playlists', {
      controller: 'PlaylistsListCtrl',
      templateUrl: 'layouts/playlists_list.html'
    })
    .when('/playlists/:playlistID', {
      controller: 'PlaylistCtrl', 
      templateUrl: 'layouts/playlist.html'
    })

    // Series-related routes.
    .when('/series', {
      controller: 'SeriesListCtrl',
      templateUrl: 'layout/series_list.html'
    })
    .when('/series/:seriesID', {
      controller: 'SeriesCtrl',
      templateUrl: 'layout/series.html'
    })

    // Seasons-related routes
    .when('/seasons', {
      controller: 'SeasonsListCtrl',
      templateUrl: 'layout/seasons_list.html'
    })
    .when('/seasons/:seasonID', {
      controller: 'SeasonCtrl',
      templateUrl: 'layout/season.html'
    })
});