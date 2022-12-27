let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "My Curse",
    artist: "Killswitch Engage",
    image: "images/music/killswitch-engage.png",
    path: "audio/music/my-curse.mp3",
  },
  {
    name: "Bodies",
    artist: "Drowning Pool",
    image: "images/music/drowning-pool.webp",
    path: "audio/music/bodies.mp3",
  },
  {
    name: "Through Struggle",
    artist: "As I Lay Dying",
    image: "images/music/as-i-lay-dying.webp",
    path: "audio/music/through-struggle.mp3",
  },
  {
    name: "Composure",
    artist: "August Burns Red",
    image: "images/music/august-burns-red.webp",
    path: "audio/music/composure.mp3",
  },
  {
    name: "This Calling",
    artist: "All That Remains",
    image: "images/music/all-that-remains.webp",
    path: "audio/music/this-calling.mp3",
  },
  {
    name: "In Due Time",
    artist: "Killswitch Engage",
    image: "images/music/killswitch-engage.png",
    path: "audio/music/in-due-time.mp3",
  },
  {
    name: "Before I Forget",
    artist: "Slipknot",
    image: "images/music/slipknot.webp",
    path: "audio/music/before-i-forget.mp3",
  },
  {
    name: "Silvera",
    artist: "Gojira",
    image: "images/music/gojira.webp",
    path: "audio/music/silvera.mp3",
  },
  {
    name: "You Eclipsed By Me",
    artist: "Atreyu",
    image: "images/music/atreyu.webp",
    path: "audio/music/you-eclipsed-by-me.mp3",
  },
  {
    name: "A Dance With Aera Cura",
    artist: "Miss May I",
    image: "images/music/miss-may-i.webp",
    path: "audio/music/a-dance-with-aera-cura.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

