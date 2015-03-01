angular.module('weesong')
.service('PlaylistSvc', function ($http, $q) {
  var svc = this;

  svc.getPlaylist = function (playlistId, state) {
    var deferred = $q.defer();

    $http.get(playlistId)
      .success(function (playlist) {
        deferred.resolve(playlist);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };
  
});