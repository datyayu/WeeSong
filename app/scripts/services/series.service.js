angular.module('weesong')
.service('SeriesSvc', function ($http, $q) {
  var svc = this;

  // Get playlist JSON from server.
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
  
});