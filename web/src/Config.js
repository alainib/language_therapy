const local_api_path = "localhost:1111";

let api_path = "http://";
let static_path = "http://";
if (window.location.hostname === "localhost") {
  api_path += local_api_path;
  static_path += local_api_path;
} else {
  api_path += window.location.host;
  static_path += window.location.host;
}

api_path += "/api";
static_path += "/static";

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

const textSize = {
  s: 2,
  sm: 3,
  md: 4,
  l: 5,
  xl: 6,
  xxl: 10
};

export default {
  colors,
  _const,
  api_path,
  static_path,
  trainOptions,
  textSize
};
