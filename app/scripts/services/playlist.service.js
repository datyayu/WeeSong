angular.module('weesong')
.service('PlaylistSvc', function ($http, $q) {
  var svc = this;

  // Get list of playlists from server
  svc.getPlaylistsList = function () {
    var deferred = $q.defer();

    $http.get('db/playlists.json')
      .success(function (playlist) {
        deferred.resolve(playlist);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };
  

  // Get playlist JSON from server.
  svc.getPlaylist = function (playlistID) {
    var deferred = $q.defer();

    $http.get('db/playlists/' + playlistID + '.json')
      .success(function (playlist) {
        deferred.resolve(playlist);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  }; 

  // Get album info & playlist from db
  svc.getAlbum = function (album) {
    var deferred = $q.defer();

    $http.get('db/albums/' + album + '.json')
      .success(function (playlist) {
        deferred.resolve(playlist);
      })
      .error(function (err) {
        deferred.reject(err);
      });

    return deferred.promise;
  };
});