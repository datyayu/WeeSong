angular.module('weesong')
.controller('SeriesCtrl', function ($scope, $location, $routeParams, SeriesSvc) {
  $scope.seriesID = $routeParams.seriesID;

  SeriesSvc
    .getSeries($scope.seriesID)
    .then(function (data) {
      $scope.series = data;
      $scope.$emit('changeTitle', data.info.title)
    });
  
  $scope.openPlaylist = function (albumID) {
    var url = '/series/title/' + $scope.seriesID + '/' + albumID;

    $location.path(url);
  };
});