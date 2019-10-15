import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Modal
} from "react-native";

import ResultsStat from "language_therapy/src/components/ResultsStat";
import IconFeather from "react-native-vector-icons/Feather";
import styles from "language_therapy/src/styles";

class Suivi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de series
      current: props.current,
      userTestList: props.userTestList,
      showModal: false,
      results: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current != this.state.current) {
      this.setState({ current: nextProps.current });
    }
    if (nextProps.userTestList != this.state.userTestList) {
      console.log("new userTestList");
      this.setState({ userTestList: nextProps.userTestList });
    }
  }

  render() {
    return (
      <View style={styles.flex1}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          style={styles.flex1}
          onRequestClose={() => {}}
        >
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <TouchableHighlight
              style={{
                zIndex: 99999,
                position: "absolute",
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                right: 5,
                top: 5,
                backgroundColor: "grey",
                borderRadius: 20
              }}
              onPress={() => {
                this.setState({
                  showModal: false,
                  results: null
                });
              }}
            >
              <Text style={thisstyles.title}>X</Text>
            </TouchableHighlight>
            <ResultsStat results={this.state.results}></ResultsStat>
          </View>
        </Modal>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column"
          }}
        >
          <View style={styles.center}>
            <Text style={thisstyles.title}>{this.state.current}</Text>
          </View>
          {this.renderUserTestList()}
        </ScrollView>
      </View>
    );
  }

  renderUserTestList() {
    let res = [];
    let _list = this.state.userTestList;
    for (var key in _list) {
      if (_list.hasOwnProperty(key)) {
        let _tests = _list[key];
        for (var i in _tests) {
          let _test = _tests[i];

          score = `t:${_test.results.total}-s:${_test.results.skiped}-1:${_test.results.oneRep}-2:${_test.results.twoRep}-3:${_test.results.threeRep}-4:${_test.results.fourRep}-5+:${_test.results.fiveAndMoreRep}`;

          res.push(
            <View
              style={i == 0 ? thisstyles.item : thisstyles.itemBis}
              key={"id" + i + _test.id.toString()}
            >
              <View style={{ ...styles.center, flex: 5 }}>
                <Text style={thisstyles.title}>
                  {i == 0 ? "-" : " "} {_test.date}
                </Text>
              </View>
              <View style={{ ...styles.center, flex: 3 }}>
                <Text style={thisstyles.title}>{_test.serie.serieName}</Text>
              </View>

              <TouchableHighlight
                style={{ ...styles.center, flex: 7 }}
                onPress={() => {
                  this.setState({
                    showModal: true,
                    results: _test.results
                  });
                }}
                underlayColor="white"
              >
                <Text style={thisstyles.title}>{score}</Text>
              </TouchableHighlight>

              <View style={{ ...styles.center, flex: 2 }}>
                {i == 0 && (
                  <IconFeather
                    name="play"
                    style={styles.center}
                    size={20}
                    color="#000"
                    onPress={() => {
                      this.props.navigation.navigate("TrainSerie", {
                        serie: _test.serie
                      });
                    }}
                  />
                )}
              </View>
            </View>
          );
        }
      }
    }

    return (
      <View>
        <View style={thisstyles.column}>
          <View style={{ ...styles.center, flex: 5 }}>
            <Text style={thisstyles.title}>Date</Text>
          </View>
          <View style={{ ...styles.center, flex: 3 }}>
            <Text style={thisstyles.title}>Thème</Text>
          </View>
          <View style={{ ...styles.center, flex: 7 }}>
            <Text style={thisstyles.title}>Score</Text>
          </View>
          <View style={{ ...styles.center, flex: 2 }}>
            <Text style={thisstyles.title}>Refaire</Text>
          </View>
        </View>
        {res}
      </View>
    );
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
    fontSize: 16
  },
  column: {
    height: 50,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "mediumseagreen"
  },
  item: {
    height: 50,
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
