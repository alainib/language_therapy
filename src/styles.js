import { StyleSheet } from "react-native";
import Config from "language_therapy/src/Config";

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textInput: {
    textAlign: "left",
    fontSize: Config.textSize.xl
  },
  padding10: {
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
  }
});

export default styles;
