angular.module('weesong')
.controller('menuCtrl', function ($scope) {
/* Menu state variables */
  $scope.activeItem = 'home';
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
      url: '/playlist'
    }
  ];


/* Event Listeners */
  $scope.$on('tabChange', function (_, tab) {
    changeTab(tab);
  });

/* Scope functions */
  // Handle click on menu.
  $scope.selectOption = function (item) {
    changeTab(item);
  };


/* Utility functions */
  function changeTab (tab) {
    activeItem = tab.id;
    $scope.$emit('pageChange', tab);
  }

});