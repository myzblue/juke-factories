'use strict';

juke.factory('PlayerFactory', function(){

	var player = {};
	
	var audio = document.createElement('audio');

	var currentSong = null;
	var songArray = [];

	player.start = function (song, songArr = null) {
	    player.pause();
	    audio.src = song.audioUrl;
	    audio.load();
	    audio.play();
	    currentSong = song
	    if (songArr) songArray = songArr
	};

	player.pause = function () {
		audio.pause();
	};

	player.resume = function () {
		audio.play();
	};

	player.isPlaying = function () {
		return !audio.paused;
	};

	player.getCurrentSong = function () {
		return currentSong;
	};

	player.next = function () {
		if (songArray.indexOf(currentSong) === songArray.length - 1) {
			player.start(songArray[0])
		} else {
			player.start(songArray[songArray.indexOf(currentSong) + 1])
		}
	};

	player.previous = function () {
		if (songArray.indexOf(currentSong) === 0) {
			player.start(songArray[songArray.length-1])
		} else {
			player.start(songArray[songArray.indexOf(currentSong) - 1])
		}
	};

	player.getProgress = function () {
		if (!player.isPlaying()) return 0
		else return audio.currentTime / audio.duration;	
	};

	return player;

  // non-UI logic in here
});
