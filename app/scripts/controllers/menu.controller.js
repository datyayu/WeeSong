angular.module('weesong')
.controller('menuCtrl', function ($scope, $location) {
/* Menu state variables */
  $scope.menuItems = [
    {
      id: '',
      title: 'Wee',
      url: '/'
    },{
      id: 'player',
      title: 'Now Playing',
      url: '/player'
    },{
      id: 'series',
      title: 'Series',
      url: '/series'
    },{
      id: 'seasons',
      title: 'Seasons',
      url: '/seasons'
    },{
      id: 'playlists',
      title: 'Playlists',
      url: '/playlists'
    }
  ];

/* Event Listeners */
  // Change the active menu item.
  $scope.$on('menuChangeUrl', function (_, url) {
    $scope.activeItem = url.split('/')[1];
  });


/* Scope functions */
  // Handle click on menu.
  $scope.selectOption = function (url) {
    $scope.$emit('changeUrl', url); 
  };
});