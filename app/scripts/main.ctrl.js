/* Dependencies */
angular.module('weesong', [
  'ngRoute'
]);

/* Main Ctrl */
angular.module('weesong')
.controller('MainCtrl', function ($scope, $rootScope, $location) {
/* Global app config */
  $rootScope.playlist = {};

/* Menu */
  $scope.pageTitle = 'Weesong'; // Inital Page name

  /* Menu states */
  $scope.menu = {};
  $scope.menu.state = false;
  $scope.menu.activeItem = 'item1';
  
  // Menu Items
  $scope.menu.items = [
    {
      id: 'item0',
      text: 'Wee',
      url: '/'
    },{
      id: 'item1',
      text: 'Now Playing',
      url: '/player'
    },{
      id: 'item2',
      text: 'Top Hits',
      url: '/top'
    },{
      id: 'item3',
      text: 'Artists',
      url: '/artists'
    },{
      id: 'item4',
      text: 'Playlists',
      url: '/playlist'
    }
  ];

  // Handle click on menu.
  $scope.selectOption = function (item) {
    $scope.$emit('tabChange', item)
    $scope.menu.state = false;
    $location.path(item.url);
  }

  // Change the selected tab on menu and the page title.
  $scope.$on('tabChange', function (_, tab) {
    $scope.menu.activeItem = tab.id;
    if(tab.text === 'Wee') {
      $scope.pageTitle = tab.text + 'song';
    } else {
      $scope.pageTitle = tab.text;
    }
  })
});