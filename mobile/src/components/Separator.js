import React from "react";
import { View } from "react-native";

const alignCenter = { alignItems: "center", padding: "2%" };

export class Separator extends React.PureComponent {
  render() {
    return (
      <View style={alignCenter}>
        <View
          style={{
            height: 1,
            width: "95%",
            backgroundColor: this.props.color || "#CED0CE"
          }}
        />
      </View>
    );
  }
}

const alignCenterBig = { alignItems: "center", padding: "2%", marginTop: 7, marginBottom: 7 };
export class BigSeparator extends React.PureComponent {
  render() {
    return (
      <View style={alignCenterBig}>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: this.props.color || "#CED0CE"
          }}
        />
      </View>
    );
  }
}
