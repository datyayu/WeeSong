angular.module('weesong')
.service('SeriesSvc', function ($http, $q) {
  var svc = this;

  // Get series' list JSON from server.
  svc.getSeriesList = function () {
    var deferred = $q.defer();

    $http.get('db/series.json')
      .success(function (seriesList) {
        deferred.resolve(seriesList);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };

  // Get series' info JSON from server.
  svc.getSeries= function (seriesID) {
    var deferred = $q.defer();

    $http.get('db/series/' + seriesID + '.json')
      .success(function (albums) {
        deferred.resolve(albums);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };

});