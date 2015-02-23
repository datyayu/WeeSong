angular.module('weesong')
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/playlist', {controller: 'PlaylistCtrl', templateUrl: 'layouts/playlist.html'})
    .when('/player',   {controller: 'PlayerCtrl',   templateUrl: 'layouts/player.html'  })

    /* Uncomment on prod */
    
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
});