angular.module('weesong')
.controller('SeriesListCtrl', function ($scope, $routeParams, $location, SeriesSvc) {
    $scope.$emit('changeTitle', 'Series'); // Set header title.
    $scope.letter = $routeParams.letter || '';

    SeriesSvc.getSeriesList().then(function (data) {
      $scope.seriesList = data;
    });

    $scope.byFirstLetter = function (actual, expected) {
      if(expected === '') { return true; }

      return actual[0].toLowerCase() === expected.toLowerCase();
    };

    $scope.openSeries = function (seriesID) {
      $location.path('/series/title/' + seriesID);
    };
})