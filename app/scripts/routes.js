/* Dependencies */
angular.module('weesong', [
  'ngRoute'
]);


/* Routes */
angular.module('weesong')
.config(function ($routeProvider, $locationProvider) {
  // HTML5 Mode
  $locationProvider.html5Mode(true)

  $routeProvider
  // Home -- SOON TM
    .when('/', { 
      redirectTo: '/player' 
    })

  // Player route.
    .when('/player', {
      controller: 'PlayerCtrl',
      templateUrl: 'assets/html/player.html',
      title: 'Now Playing'
    })

  // Playlist-related routes.
    .when('/playlists', {
      controller: 'PlaylistsListCtrl',
      templateUrl: 'assets/html/playlists_list.html'
    })
    .when('/playlists/:playlistID', {
      controller: 'PlaylistCtrl', 
      templateUrl: 'assets/html/playlist.html'
    })

  // Series-related routes.
    .when('/series', {
      controller: 'SeriesListCtrl',
      templateUrl: 'assets/html/series_list.html'
    })
    .when('/series/title/:seriesID', {
      controller: 'SeriesCtrl',
      templateUrl: 'assets/html/series.html'
    })
    .when('/series/title/:seriesID/:singleType', {
      controller: 'PlaylistCtrl',
      templateUrl: 'assets/html/series_single.html'
    })
    
  // Series Search
    .when('/series/filter', {
      controller: 'SeriesListCtrl',
      templateUrl: 'assets/html/series_list.html'
    }).when('/series/filter/:letter', {
      controller: 'SeriesListCtrl',
      templateUrl: 'assets/html/series_list.html'
    })

  // Seasons-related routes
    .when('/seasons', {
      controller: 'SeasonsListCtrl',
      templateUrl: 'assets/html/seasons_list.html'
    })
    .when('/seasons/:seasonID', {
      controller: 'SeasonCtrl',
      templateUrl: 'assets/html/season.html'
    })
  // On errors.
    .when('/wut', { 
      templateUrl: 'assets/html/404.html' 
    })
    .otherwise({ redirectTo: '/wut' })

});