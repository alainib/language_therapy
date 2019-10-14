import React from "react";
import {
  View,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Alert
} from "react-native";

import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";

import {
  image_AllSeriesNames,
  image_randomSerie
} from "language_therapy/src/services/image";

class MotImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de series
      seriesNames: []
    };
  }
  // pour encadrer en rouge ou vert la réponse sélectionner puis passer à la question suivante si juste

  _timeout = null;

  async componentDidMount() {
    this._timeout = null;
    let seriesNames = await image_AllSeriesNames();

    this.setState({
      seriesNames
    });
    if (this.props.currentUser == null) {
      Alert.alert(
        "STOP",
        "Aucun n'utilisateur n'a été selectionné, revenir en arrière et en créer un",
        [
          {
            text: "revenir en arrière",
            onPress: () => this.props.navigation.goBack()
          }
        ],
        { cancelable: false }
      );
    }
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount = () => {
    clearTimeout(this._timeout);
  };

  /** choix de la serie thèmatique */
  chooseSerie = async serieName => {
    let res = await image_randomSerie(
      serieName,
      this.props.options.nbrOfQuestionPerSerie,
      this.props.options.nbrOfImagePerQuestion,
      this.props.options.displayLg,
      this.props.options.level
    );

    this.props.navigation.navigate("TrainSerie", { serie: res });
  };

  /**
   * affiche la liste des series thematiques disponibles
   */
  renderSeries() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 9 }}>
          <Text style={thisstyles.title}>Series disponibles :</Text>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {this.state.seriesNames.map((item, index) => {
              return (
                <View style={thisstyles.item} key={"ac" + index.toString()}>
                  <Button
                    color={"green"}
                    title={item}
                    onPress={() => this.chooseSerie(item)}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ width: 50, height: 50 }}>
          <IconFeather
            name="settings"
            style={styles.padding10}
            size={Config.iconSize.xl}
            color="#000"
            onPress={() => {
              this.props.navigation.navigate("Options");
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    return <View style={styles.flex1}>{this.renderSeries()}</View>;
  }
}

function mapStatetoProps(data) {
  return {
    currentUser: data.users.current,
    options: data["options"]
  };
}

import * as actions from "language_therapy/src/redux/actions";
import { connect } from "react-redux";

export default connect(
  mapStatetoProps,
  actions
)(MotImage);

const thisstyles = StyleSheet.create({
  title: {
    fontSize: 23,
    margin: 5
  },

  item: {
    width: 175,
    height: 75,
    margin: 5
  }
});
