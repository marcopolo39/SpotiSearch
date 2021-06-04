"use-script";

//saves token after connecting to Spotify API and redirects user to homepage

const recvdHash = new URLSearchParams(window.location.hash.substr(1));
const token = recvdHash.get("access_token");
localStorage.setItem("token", token);
window.location.href = "http://127.0.0.1:8080/";
