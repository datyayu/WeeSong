angular.module('weesong')
.controller('SeriesListCtrl', function ($scope, SeriesSvc) {
    $scope.$emit('changeTitle', 'Series'); // Set header title.

    SeriesSvc.getSeriesList().then(function (data) {
      console.log(data)
      $scope.seriesList = data;
    });
})