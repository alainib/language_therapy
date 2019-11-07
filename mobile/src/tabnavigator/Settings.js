import React from "react";

import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

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
          <IconIonic
            name="md-settings"
            size={Config.iconSize.xxl}
            color={tintColor}
          />
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
          alignItems: "center"
        }}
      >
        <Text>Settings ...</Text>
        <Button
          containerStyle={styles.margin10}
          title="Verification des données"
          onPress={() => this.props.navigation.navigate("DataChecker")}
        />

        <Button
          containerStyle={styles.margin10}
          title="UpdateData"
          onPress={() => this.props.navigation.navigate("UpdateData")}
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

export default connect(
  mapStatetoProps,
  actions
)(Settings);

const thisstyles = StyleSheet.create({});