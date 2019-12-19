import { StyleSheet } from "react-native";
import Config from "language_therapy/src/Config";

const { width, height } = Config;
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
  alignCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: Config.customHeaderHeight
  },
  modalHeaderTitle: {
    // fontFamily: Config.fonts("sfprotextregular"),
    color: Config.colors.black,
    fontSize: Config.textSize.xl,
    textAlign: "left",
    justifyContent: "flex-start",
    textAlignVertical: "center"
  },
  modalHeaderTitleCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  customHeaderContainer: {
    /*	borderBottomWidth: 1,
		borderRadius: 2,
		borderColor: "#f8f8f8",*/
    backgroundColor: Config.colors.background,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: Config.customHeaderHeight
  },

  flexRowSpaceAround: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },

  flexRowSpaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  buttonBorderRadius: {
    borderRadius: 50
  },
  transparentButton: {
    minHeight: Config.button.minHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 1,
    elevation: 0,
    paddingLeft: Config.button.pf,
    paddingRight: Config.button.pr
  },

  textColorOrange: {
    color: Config.colors.orange,
    //    fontFamily: Config.fonts("sfprotextregular"),
    fontSize: Config.textSize.l
  },
  textColorWhite: {
    color: Config.colors.white,
    //    fontFamily: Config.fonts("sfprotextregular"),
    fontSize: Config.textSize.l
  },
  textColorGrey: {
    color: Config.colors.grey,
    //  fontFamily: Config.fonts("sfprotextregular"),
    fontSize: Config.textSize.l
  },
  textColorRed: {
    color: Config.colors.red,
    // fontFamily: Config.fonts("sfprotextregular"),
    fontSize: Config.textSize.l
  },
  textColorGreen: {
    fontSize: Config.textSize.l,
    //  fontFamily: Config.fonts("sfprotextregular"),
    color: Config.colors.green
  }
});

export default styles;
