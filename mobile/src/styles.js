import { StyleSheet } from "react-native";
import Config from "language_therapy/src/Config";

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  flex1BG: {
    flex: 1,
    backgroundColor: Config.colors.background
  },
  BG: {
    backgroundColor: Config.colors.background
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    textAlign: "left",
    fontSize: Config.textSize.xl
  },
  padding10center: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  containerCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fcff"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  titleMD: {
    fontSize: 15,
    textAlign: "left",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  padding10: {
    padding: 10
  },
  margin10: { margin: 10 },
  flexRowSpaceAround: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default styles;
