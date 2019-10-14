import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";

import styles from "language_therapy/src/styles";

class Suivi extends Component {
  render() {
    return (
      <View style={styles.flex1}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column"
          }}
        >
          <View style={styles.center}>
            <Text style={thisstyles.title}>{this.props.current}</Text>
          </View>
          {this.renderUserTestList()}
        </ScrollView>
      </View>
    );
  }

  renderUserTestList() {
    let res = [];
    let _list = this.props.userTestList;
    for (var key in _list) {
      if (_list.hasOwnProperty(key)) {
        console.log(key, _list[key]);
        let _test = _list[key];
        res.push(
          <View style={thisstyles.item} key={"ac" + _test.id.toString()}>
            <Text style={thisstyles.title}>{_test.date}</Text>
            <Text style={thisstyles.title}>{_test.serie.serieName}</Text>
            <Text style={thisstyles.title}>{_test.score}</Text>
          </View>
        );
      }
    }

    return res;
  }
}

import * as actions from "language_therapy/src/redux/actions";
import { connect } from "react-redux";
function mapStatetoProps(data) {
  let userTestList = data.users.list[data.users.current];
  return {
    current: data.users.current,
    userTestList
  };
}
export default connect(
  mapStatetoProps,
  actions
)(Suivi);

const thisstyles = StyleSheet.create({
  title: {
    fontSize: 23
  },

  item: {
    margin: 5,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightskyblue"
  }
});
