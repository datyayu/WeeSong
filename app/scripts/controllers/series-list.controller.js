angular.module('weesong')
.controller('SeriesListCtrl', function ($scope, $routeParams, SeriesSvc) {
    $scope.$emit('changeTitle', 'Series'); // Set header title.
    $scope.letter = $routeParams.letter || '';
    console.log($scope.letter)

    SeriesSvc.getSeriesList().then(function (data) {
      $scope.seriesList = data;
    });

    $scope.byFirstLetter = function (actual, expected) {
      if(expected === '') { return true; }

      return actual[0].toLowerCase() === expected.toLowerCase();
    };
})