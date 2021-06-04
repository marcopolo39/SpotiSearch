"use-strict";

// DOM elements

const searchBar = document.querySelector(".searchBar");
const albumArt = document.querySelector(".albumArt");
const trackName = document.querySelector("#track");
const artistName = document.querySelector("#artist");
const albumName = document.querySelector("#albumName");
const dancebilityIndex = document.querySelector("#dancebility");
const energyIndex = document.querySelector("#energy");
const acousticnesIndex = document.querySelector("#acousticnes");
const livenessIndex = document.querySelector("#liveness");
const tempo = document.querySelector("#tempo");
const spotifyLink = document.querySelector("#spotifyLink");
const infoBlockDiv = document.querySelector("#infoBlockDiv");

// Helper functions

// if a token exists, that means that the user is logged in and can search the Spotify API
function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

// retrieves token from local storage
function getToken() {
  return localStorage.getItem("token");
}

// shows infoBlockDiv when the users begins their search
function showContent() {
  infoBlockDiv.classList.remove("hidden");
}

// Event Listeners

// search the Spotify API when the users presses enter
searchBar.addEventListener("keypress", function (e) {
  console.log(e);
  if (e.key === "Enter") {
    if (searchBar.value === "") alert("Please enter a valid song");
    else {
      search(searchBar.value);
    }
  }
});

// API call - searches Spotify API with given search value, displays the first result, and then uses the song id to retireve the audio features of the song from the API
function search(searchVal) {
  const request = fetch(
    `https://api.spotify.com/v1/search?q=${encodeURI(
      searchVal
    )}&limit=10&market=us&type=track`,
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      showContent();
      // filter items that are only singles or in an album
      let items = data.tracks.items.filter(
        (item) =>
          item.album.album_type === "single" ||
          item.album.album_type === "album"
      );
      albumArt.src = items[0].album.images[0].url;
      trackName.textContent = items[0].name;
      artistName.textContent = items[0].artists[0].name;
      albumName.textContent = items[0].album.name;
      spotifyLink.href = items[0].external_urls["spotify"];
      return fetch(
        `https://api.spotify.com/v1/audio-features?ids=${items[0].id}`,
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      );
    })
    .then((response) => response.json())
    .then((data) => {
      const audio_features = data.audio_features[0];
      dancebilityIndex.textContent = (
        audio_features.danceability * 100
      ).toFixed(2);
      energyIndex.textContent = (audio_features.energy * 100).toFixed(2);
      acousticnesIndex.textContent = (
        audio_features.acousticness * 100
      ).toFixed(2);
      livenessIndex.textContent = (audio_features.liveness * 100).toFixed(2);
      tempo.textContent = Math.trunc(audio_features.tempo);
    });
}
