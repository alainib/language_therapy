const path_local = "http://localhost:1111/";
const path_remote = "http://88.190.14.12:1111/";

const api_path = window.location.href.includes("localhost") ? path_local + "api/" : path_remote + "api/";
const static_path = window.location.href.includes("localhost") ? path_local + "static/" : path_remote + "static/";

const _const = {
  easy: "easy",
  middle: "middle",
  hard: "hard",
  fr: "fr",
  ar: "ar"
};
const trainOptions = {
  playSoundAfterXWrong: 2
};
const colors = {
  // couleur du fond de l'application
  background: "#FFF",
  // couleur gris clair pour le touchOpacity
  touchOpacity: "rgba(207, 207, 207, 0.9)",
  // utilisé pour le fond des modal
  opaque: "rgba(0,0,0,0.8)",

  // pour les boutons etc
  blue: "#04b09a",
  bluegrad: "#F4FFFF",
  green: "#04b09a",
  grey: "#BFBEBE",
  red: "#c1272d",
  black: "#535559",
  white: "white",
  orange: "#f1c40f",

  greyOverlay: "rgba(114, 114, 114,0.1)",
  whiteOverlay: "rgba( 246, 246, 246, 0.9)"
};

export default {
  colors,
  _const,
  api_path,
  static_path,
  trainOptions
};
