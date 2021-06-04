"use-strict";

// Helper functions

function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

function getToken() {
  return localStorage.getItem("token");
}

// API call to get username when logged in
function getUser() {
  const request = fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  })
    .then((response) => {
      if (response.status === 401) {
        logout();
      }
      return response.json();
    })
    .then((data) => {
      username.textContent = data.display_name;
    })
    .catch((err) => {
      alert(err);
    });
}

if (isLoggedIn()) {
  getUser();
}
