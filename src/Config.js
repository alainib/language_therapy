import { Dimensions } from "react-native";
let { width, height } = Dimensions.get("window");

const _const = {
  easy: "easy",
  middle: "middle",
  fr: "fr",
  ar: "AR"
};

const iconSize = {
  md: 15,
  m: 17,
  l: 20,
  xl: 25,
  xxl: 45
};

const textSize = {
  s: 10,
  sm: 13,
  md: 15,
  l: 18,
  xl: 20
};

export default {
  height,
  width,
  _const,
  iconSize,
  textSize
};
