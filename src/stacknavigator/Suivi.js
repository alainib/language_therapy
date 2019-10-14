import React, { Component } from "react";

import { StyleSheet, Text, View, ScrollView } from "react-native";

import IconFeather from "react-native-vector-icons/Feather";
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
        let _tests = _list[key];
        for (var i in _tests) {
          let _test = _tests[i];
          res.push(
            <View
              style={i == 0 ? thisstyles.item : thisstyles.itemBis}
              key={"id" + i + _test.id.toString()}
            >
              <Text style={thisstyles.title}>
                {i == 0 ? "-" : " "} {_test.date}
              </Text>
              <Text style={thisstyles.title}>{_test.serie.serieName}</Text>
              <Text style={thisstyles.title}>{_test.score}</Text>
              {i == 0 && (
                <IconFeather
                  name="play"
                  style={styles.center}
                  size={20}
                  color="#000"
                  onPress={() => {
                    let res = _list[key][i].serie;
                    this.props.navigation.navigate("TrainSerie", {
                      serie: res
                    });
                  }}
                />
              )}
            </View>
          );
        }
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
    fontSize: 20
  },
  item: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "skyblue"
  },
  itemBis: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "aliceblue"
  }
});
