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
      templateUrl: 'layouts/player.html',
      title: 'Now Playing'
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
      templateUrl: 'layouts/series_list.html'
    })
    .when('/series/title/:seriesID', {
      controller: 'SeriesCtrl',
      templateUrl: 'layouts/series.html'
    })
    .when('/series/title/:seriesID/:singleType', {
      controller: 'PlaylistCtrl',
      templateUrl: 'layouts/series_single.html'
    })
    
  // Series Search
    .when('/series/filter', {
      controller: 'SeriesListCtrl',
      templateUrl: 'layouts/series_list.html'
    }).when('/series/filter/:letter', {
      controller: 'SeriesListCtrl',
      templateUrl: 'layouts/series_list.html'
    })

  // Seasons-related routes
    .when('/seasons', {
      controller: 'SeasonsListCtrl',
      templateUrl: 'layouts/seasons_list.html'
    })
    .when('/seasons/:seasonID', {
      controller: 'SeasonCtrl',
      templateUrl: 'layouts/season.html'
    })
});