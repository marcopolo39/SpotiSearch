"use-strict";

// API variables
const CLIENT_ID = "e17ebf0408d94231b78a75cf1284f31b";
const SECRET_KEY = "9c8bed1c0aa1430c87677c78643618b0";
const REDIRECT_URI = "http://127.0.0.1:8080/callback.html";

//DOM variables
const loginLogoutBtn = document.querySelector(".logout");
const username = document.querySelector(".username");

// Event Listeners
loginLogoutBtn.addEventListener("click", function () {
  if (!isLoggedIn()) {
    login();
  } else logout();
});

// Helper Functions
function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

function getToken() {
  return localStorage.getItem("token");
}

function login() {
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`;
}

function logout() {
  localStorage.removeItem("token");
  loginLogoutBtn.textContent = "Log In";
  username.textContent = "";
  hideContent();
  searchBar.value = "";
}

function hideContent() {
  infoBlockDiv.classList.add("hidden");
}
