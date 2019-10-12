import { Dimensions } from "react-native";
let { width, height } = Dimensions.get("window");

const _const = {
  easy: "easy",
  middle: "middle",
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

export default {
  iconSize,
  textSize,
  height,
  width,
  _const
};
