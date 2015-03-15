angular.module('weesong')
.controller('SeasonCtrl', function ($scope, $routeParams, $location, SeasonsSvc) {

    SeasonsSvc
      .getSeason($routeParams.seasonID)
      .then(function (data) {
        $scope.season = data;
        $scope.$emit('changeTitle', data.title); // Set header title.
      });

    $scope.openSeries = function (seriesID) {
      $location.path('/series/title/' + seriesID);
    };
})