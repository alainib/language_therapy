import React from "react";

import { View, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from "react-native";

import { Button } from "react-native-elements";
import IconIonic from "react-native-vector-icons/Ionicons";
import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import * as tools from "language_therapy/src/tools";

class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Réglages",
      tabBarIcon: ({ tintColor }) => (
        <TouchableOpacity
          underlayColor={Config.colors.blue}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <IconIonic name="md-settings" size={Config.iconSize.xxl} color={tintColor} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          ...styles.BG
        }}
      >
        <Button
          titleStyle={styles.textColorGreen}
          buttonStyle={styles.transparentButton}
          containerViewStyle={styles.buttonBorderRadius}
          title="Verification des erreurs"
          onPress={() => this.props.navigation.navigate("ErrorChecker")}
        />
        <Button
          titleStyle={styles.textColorGreen}
          buttonStyle={styles.transparentButton}
          containerViewStyle={styles.buttonBorderRadius}
          title="Verification des données"
          onPress={() => this.props.navigation.navigate("DataChecker")}
        />
      </View>
    );
  }
}

function mapStatetoProps(data) {
  return {};
}

import * as actions from "language_therapy/src/redux/actions";
import { connect } from "react-redux";

export default connect(mapStatetoProps, actions)(Settings);

const thisstyles = StyleSheet.create({});
