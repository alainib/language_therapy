//Comprehension.js
import React from "react";
import {
  View,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";
import { Slider } from "react-native-elements";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    thisstyles.title["fontSize"] = this.props.options.interfaceSize;
    return (
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View>
          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Niveau :</Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={
                    this.props.options.level == Config._const.easy
                      ? "green"
                      : "grey"
                  }
                  title="Facile"
                  onPress={() =>
                    this.props.action_optionUpdate(
                      "level",
                      null,
                      Config._const.easy
                    )
                  }
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={
                    this.props.options.level == Config._const.middle
                      ? "green"
                      : "grey"
                  }
                  title="Moyen"
                  onPress={() =>
                    this.props.action_optionUpdate(
                      "level",
                      null,
                      Config._const.middle
                    )
                  }
                />
              </View>
            </View>
          </View>
          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Langue :</Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={
                    this.props.options.displayLg == Config._const.fr
                      ? "green"
                      : "grey"
                  }
                  title={Config._const.fr}
                  onPress={() =>
                    this.props.action_optionUpdate(
                      "displayLg",
                      null,
                      Config._const.fr
                    )
                  }
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={
                    this.props.options.displayLg == Config._const.ar
                      ? "green"
                      : "grey"
                  }
                  title={Config._const.ar}
                  onPress={() =>
                    this.props.action_optionUpdate(
                      "displayLg",
                      null,
                      Config._const.ar
                    )
                  }
                />
              </View>
            </View>
          </View>
          <View style={thisstyles.bloc}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center"
                }}
              >
                <Text style={thisstyles.title}>
                  Nombre de series :{this.props.options.nbrOfQuestionPerSerie}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center"
                }}
              >
                <Slider
                  value={this.props.options.nbrOfQuestionPerSerie}
                  minimumValue={5}
                  maximumValue={20}
                  step={1}
                  onValueChange={value => {
                    this.props.action_optionUpdate(
                      "nbrOfQuestionPerSerie",
                      null,
                      value
                    );
                  }}
                />
              </View>
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center"
                }}
              >
                <Text style={thisstyles.title}>
                  Nombre d'images par serie :
                  {this.props.options.nbrOfImagePerQuestion}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center"
                }}
              >
                <Slider
                  value={this.props.options.nbrOfImagePerQuestion}
                  minimumValue={2}
                  maximumValue={8}
                  step={1}
                  onValueChange={value => {
                    this.props.action_optionUpdate(
                      "nbrOfImagePerQuestion",
                      null,
                      value
                    );
                  }}
                />
              </View>
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center"
                }}
              >
                <Text style={thisstyles.title}>
                  Taille de police :{this.props.options.interfaceSize}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center"
                }}
              >
                <Slider
                  value={this.props.options.interfaceSize}
                  minimumValue={20}
                  maximumValue={70}
                  step={1}
                  onValueChange={value => {
                    this.props.action_optionUpdate(
                      "interfaceSize",
                      null,
                      value
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.center}>
          <Button
            color={"blue"}
            title="Fermer"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}

function mapStatetoProps(data) {
  return {
    options: data["options"]
  };
}

import * as actions from "language_therapy/src/redux/actions";
import { connect } from "react-redux";
export default connect(
  mapStatetoProps,
  actions
)(Options);

const thisstyles = StyleSheet.create({
  padding510: { padding: 5, paddingTop: 10, paddingBottom: 10 },
  m5: { margin: 5, backgroundColor: "green" },
  title: {
    fontSize: 23,
    margin: 5
  },
  bloc: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5
  },
  titleEntry: {
    fontSize: 18,
    margin: 5
  },
  viewButton: {
    padding: 3,
    height: 50,
    width: 75
  },
  item: {
    width: 175,
    height: 75,
    margin: 5
  }
});
