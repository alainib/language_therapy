import { Dimensions } from "react-native";
let { width, height } = Dimensions.get("window");

const _const = {
  easy: "easy",
  middle: "middle",
  hard: "hard",
  fr: "fr",
  ar: "ar"
};

const iconSize = {
  s: 10,
  sm: 13,
  md: 15,
  l: 18,
  xl: 20,
  xxl: 30
}; //this.state.interfaceSize

const textSize = {
  s: 10,
  sm: 13,
  md: 15,
  l: 18,
  xl: 20,
  xxl: 30
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
  iconSize,
  colors,
  textSize,
  height,
  width,
  _const
};
