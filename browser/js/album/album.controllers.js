'use strict';

juke.controller('AlbumCtrl', function ( AlbumFactory, $scope, $http, $rootScope, $log) {

    AlbumFactory.fetchAll()
  .then(function (res) { return res.data; })
  .then(function (albums) {
    return  AlbumFactory.fetchById(1); // temp: get one
  })
  .then(function (res) { return res.data; })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing && song === $scope.currentSong) {
      $rootScope.$broadcast('pause');
    } else $rootScope.$broadcast('play', song);
  };

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

  // functionality
  function pause () {
    $scope.playing = false;
  }
  function play (event, song) {
    $scope.playing = true;
    $scope.currentSong = song;
  };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  function skip (interval) {
    if (!$scope.currentSong) return;
    var index = $scope.currentSong.albumIndex;
    index = mod( (index + (interval || 1)), $scope.album.songs.length );
    $scope.currentSong = $scope.album.songs[index];
    if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };
});


juke.controller('AlbumsCtrl', function(AlbumFactory, $scope, $log){
    AlbumFactory.fetchAll()
        .then(function(result){
            $scope.albums = result.data;
            //console.log($scope.albums);

            return result.data;
        })
        .then(function(albums){
            albums.forEach(function (elm){
                elm.imageUrl = '/api/albums/' + elm.id + '/image';
            })
        })
        //.then(function (albums) {
        //    AlbumFactory.fetchById(1).then(function(res){
        //        $scope.album1 = res.data;
        //        console.log($scope.album1);
        //    }); // temp: get one
        //
        //})
        .catch($log.error);

})


