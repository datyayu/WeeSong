angular.module('weesong')
.controller('SeasonsListCtrl', function ($scope, $location, SeasonsSvc) {
  $scope.$emit('changeTitle', 'Seasons')

  SeasonsSvc
    .getSeasonsList()
    .then(function (seasonsList) {
      $scope.seasons = seasonsList;
    });

    $scope.openSeason = function (seasonID) {
      $location.path('/seasons/' + seasonID);
    }
})