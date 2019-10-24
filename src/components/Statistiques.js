import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";

/**
 *
 */
export default class Statistiques extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: this.props.flexDirection
            ? this.props.flexDirection
            : "row",
          height: _height,
          backgroundColor: "bluesky",
          ...this.props.parentStyle
        }}
      >
        <Text>aa</Text>
      </View>
    );
  }
}

const thisstyles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  item: {
    flex: 1,
    height: _height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue"
  },
  itemBis: {
    flex: 1,
    height: _height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "aliceblue"
  }
});
