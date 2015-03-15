angular.module('weesong')
.service('SeasonsSvc', function ($http, $q) {
  var svc = this;

  // Get seasons list JSON from server.
  svc.getSeasonsList = function () {
    var deferred = $q.defer();

    $http.get('db/seasons.json')
      .success(function (seriesList) {
        deferred.resolve(seriesList);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };

  // Get season series JSON from server.
  svc.getSeason= function (seasonID) {
    var deferred = $q.defer();

    $http.get('db/seasons/' + seasonID + '.json')
      .success(function (seriesList) {
        deferred.resolve(seriesList);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };

});