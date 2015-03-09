angular.module('weesong')
.controller('menuCtrl', function ($scope, $location) {
/* Menu state variables */
  $scope.activeItem = $location.path().split(/[/]/)[1] || 'home'; // Current tab
  $scope.menuItems = [
    {
      id: 'home',
      text: 'Wee',
      url: '/'
    },{
      id: 'player',
      text: 'Now Playing',
      url: '/player'
    },{
      id: 'top',
      text: 'Top Hits',
      url: '/top'
    },{
      id: 'artist',
      text: 'Artists',
      url: '/artists'
    },{
      id: 'playlist',
      text: 'Playlists',
      url: '/playlists'
    }
  ];


/* Event Listeners */
  $scope.$on('changeTab', function (_, tab) {
    changeTab(tab);
  });


/* Scope functions */
  // Handle click on menu.
  $scope.selectOption = function (item) {
    changeTab(item);
  };


/* Utility functions */
  // Change current tab and tell mainCtrl to change route.
  function changeTab (tab) {
    $scope.activeItem = tab.id;
    $scope.$emit('pageChange', tab);
  }

});