import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";

import styles from "language_therapy/src/styles";

/**
 *
 */
export default class Statistiques extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: this.props.flexDirection ? this.props.flexDirection : "row",
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
