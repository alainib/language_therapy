import React from "react";
import { View, Button, ScrollView, StyleSheet, Text } from "react-native";

import IconFeather from "react-native-vector-icons/Feather";
import styles from "language_therapy/src/styles";

class ErrorChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ justifyContent: "space-around", ...styles.BG }}>
        <Button color={"orange"} title={"reset"} onPress={() => this.props.action_reseterrorlog()} />
        <Text>ErrorChecker</Text>
        {this.renderErrorList()}
      </ScrollView>
    );
  }

  renderErrorList() {
    let res = [];
    let _list = this.props.errorlog;
    for (let i in _list) {
      const item = _list[i];
      res.push(
        <View key={i} style={thisstyles.item}>
          <View style={{ ...styles.center, flex: 5 }}>
            <Text style={thisstyles.title}>{item.categoriesName.toString()}</Text>
          </View>
          <View style={{ ...styles.center, flex: 3 }}>
            <Text style={thisstyles.title}>{item.level}</Text>
          </View>
          <View style={{ ...styles.center, flex: 10 }}>
            <Text style={thisstyles.title}>{item.errors}</Text>
          </View>
          <View style={{ ...styles.center, flex: 3 }}>
            <IconFeather
              name="play"
              style={styles.center}
              size={20}
              color="#000"
              onPress={() => {
                this.props.navigation.navigate("TrainCategorie", {
                  categorie: item.results
                });
              }}
            />
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={thisstyles.column}>
          <View style={{ ...styles.center, flex: 5 }}>
            <Text style={thisstyles.title}>Categorie</Text>
          </View>
          <View style={{ ...styles.center, flex: 3 }}>
            <Text style={thisstyles.title}>Level</Text>
          </View>
          <View style={{ ...styles.center, flex: 10 }}>
            <Text style={thisstyles.title}>Erreurs </Text>
          </View>
          <View style={{ ...styles.center, flex: 3 }}>
            <Text style={thisstyles.title}>Replay </Text>
          </View>
        </View>
        {res}
      </View>
    );
  }
}

function mapStatetoProps(data) {
  return {
    errorlog: data["errorlog"]
  };
}

import * as actions from "language_therapy/src/redux/actions";
import { connect } from "react-redux";
export default connect(mapStatetoProps, actions)(ErrorChecker);

const thisstyles = StyleSheet.create({
  item: {
    height: 50,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "skyblue"
  },
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
  }
});
