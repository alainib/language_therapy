import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
const _height = 50;
/**
 * affiche juste une ligne avec carreaux pour estimer la largeur des flex
 *
 * props :
 * number  nombre de case , default : 10
 * flexDirection : row/column, default "row"
 *
 *  import FlexSize from "language_therapy/src/components/FlexSize";
 *    <FlexSize number={15}></FlexSize>
 */
export default class FlexSize extends Component {
  render() {
    let number = this.props.number ? this.props.number : 10;
    let items = [];

    for (var i = 1; i <= number; i++) {
      let styleTmp = i % 2 == 0 ? thisstyles.item : thisstyles.itemBis;
      items.push(
        <View key={i.toString()} style={styleTmp}>
          <Text>{i}</Text>
        </View>
      );
    }
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
        {items}
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
