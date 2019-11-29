import React from "react";

import { View, Button, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Image, Modal, Alert } from "react-native";

import IconIonic from "react-native-vector-icons/Ionicons";
import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";

import {
  image_AllSeriesNames,
  image_randomSerie,
  image_allImagesFromSerie,
  image_serieFromImages
} from "language_therapy/src/services/image";

let _ImageWidth = 175;

class MotImage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mot image",
      tabBarIcon: ({ tintColor }) => (
        <TouchableOpacity
          underlayColor={Config.colors.blue}
          onPress={() => {
            navigation.navigate("MotImage");
          }}
        >
          <IconIonic name="md-images" size={Config.iconSize.xxl} color={tintColor} />
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de series
      seriesNames: [],
      multiSeriesNames: {},
      mode: "series",
      modal: { show: false, images: [] }
    };
  }

  initMultiSeries = () => {
    let multiSeriesNames = { main: {}, second: {} };
    for (var i in this.state.seriesNames) {
      multiSeriesNames.main[this.state.seriesNames[i]] = false;
      multiSeriesNames.second[this.state.seriesNames[i]] = false;
    }
    this.setState({ multiSeriesNames, mode: "multiseries" });
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.options.multiSeries && nextProps.options.multiSeries) {
      this.initMultiSeries();
    } else if (this.props.options.multiSeries && !nextProps.options.multiSeries) {
      this.setState({ mode: "series" });
    }
  }

  // pour encadrer en rouge ou vert la réponse sélectionner puis passer à la question suivante si juste
  _timeout = null;
  async componentDidMount() {
    this._timeout = null;
    let seriesNames = await image_AllSeriesNames();

    this.setState(
      {
        seriesNames
      },
      () => {
        if (this.props.options.multiSeries) {
          this.initMultiSeries();
        }
      }
    );
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

  componentWillUnmount = () => {
    clearTimeout(this._timeout);
  };

  /** choix de la serie thèmatique */
  chooseSerie = async serieName => {
    // si les images ne sont pas choisie à la main le service
    // image_randomSerie le fait automatiquement
    if (!this.props.options.manualChooseImage) {
      let res = await image_randomSerie(
        [serieName],
        this.props.options.nbrOfQuestionPerSerie,
        this.props.options.nbrOfImagePerQuestion,
        this.props.options.displayLg,
        this.props.options.level
      );

      this.props.navigation.navigate("TrainSerie", { serie: res });
    } else {
      let images = image_allImagesFromSerie(serieName);
      // si les images sont choisie à la main on ouvre la modal pour afficher celles de la serie choisie
      this.setState({ serieName, modal: { show: true, images } });
    }
  };

  clickImage = frname => {
    let _images = tools.clone(this.state.modal.images);
    for (var i in _images) {
      if (_images[i]["fr"] == frname) {
        _images[i]["selected"] = !!!_images[i]["selected"];
      }
    }
    this.setState({ modal: { show: true, images: _images } });
  };

  chooseMultiSerie(cat, seriename) {
    let multiSeriesNames = { ...this.state.multiSeriesNames };

    multiSeriesNames[cat][seriename] = !multiSeriesNames[cat][seriename];

    this.setState({ multiSeriesNames });
  }
  resetMultiSeries = () => {
    this.initMultiSeries();
  };
  goMultiSeries = async () => {
    let seriesName = [];
    for (var i in this.state.multiSeriesNames.main) {
      if (this.state.multiSeriesNames.main[i]) {
        seriesName.push(i);
      }
    }
    let res = await image_randomSerie(
      seriesName,
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
                <Button color={"green"} title={item} onPress={() => this.chooseSerie(item)} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  renderMultiSeries() {
    let main = tools.objectToArray(this.state.multiSeriesNames.main);
    let second = tools.objectToArray(this.state.multiSeriesNames.second);
    return (
      <View style={{ flex: 9, flexDirection: "column" }}>
        <View style={{ flex: 1 }}>
          <Text style={[thisstyles.item, thisstyles.subtitle]}>Series disponibles :</Text>
          <ScrollView
            showsVerticalScrollIndicator
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {main.map((item, index) => {
              return (
                <View style={thisstyles.item} key={"ac" + index.toString()}>
                  <Button
                    color={item.value ? "green" : "grey"}
                    disabled={this.state.multiSeriesNames.second[item.key]}
                    title={item.key}
                    onPress={() => this.chooseMultiSerie("main", item.key)}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/*
        <View style={{ flex: 1 }}>
          <Text style={[thisstyles.item, thisstyles.subtitle]}>Serie(s) secondaire(s) :</Text>
          <ScrollView
            showsVerticalScrollIndicator
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {second.map((item, index) => {
              return (
                <View style={thisstyles.item} key={"ac" + index.toString()}>
                  <Button
                    color={item.value ? "green" : "grey"}
                    disabled={this.state.multiSeriesNames.main[item.key]}
                    title={item.key}
                    onPress={() => this.chooseMultiSerie("second", item.key)}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        */}
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 30 }}>
          <Button color={"orange"} title="Reset" onPress={() => this.resetMultiSeries()} />
          <Button color={"blue"} title="Valider" onPress={() => this.goMultiSeries()} />
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.flex1}>
        {this.renderModal()}

        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.state.mode == "multiseries" ? this.renderMultiSeries() : this.renderSeries()}

          <View style={{ width: 50, height: 50 }}>
            <IconFeather
              name="settings"
              style={styles.padding10center}
              size={Config.iconSize.xl}
              color="#000"
              onPress={() => {
                this.props.navigation.navigate("Options");
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  renderModal = () => {
    if (!this.state.modal.show) {
      return null;
    }

    let borderStyleSelected = {
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
      width: _ImageWidth,
      height: _ImageWidth,
      borderWidth: 4,
      borderColor: "green"
    };
    let normalStyle = { margin: 9 };

    const selectedImages = this.state.modal.images.filter(item => item.selected);

    let disabledButton = selectedImages.length < 2;
    let stillNeeded = selectedImages.length < 2 ? " -" + (2 - selectedImages.length) : "";
    return (
      <Modal animationType="slide" transparent={false} visible={this.state.modal.show} style={styles.flex1} onRequestClose={() => {}}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <TouchableOpacity
              style={{ padding: 5, paddingHorizontal: 20 }}
              underlayColor={Config.colors.blue}
              onPress={() => {
                this.setState({ modal: { show: false, images: [] } });
              }}
            >
              <IconFeather name="arrow-left" size={Config.iconSize.xxl} color={"grey"} />
            </TouchableOpacity>
            <Text style={thisstyles.title}>Choisir les images : </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              padding: 15,
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {this.state.modal.images.map((item, index) => {
              return (
                <View style={item.selected ? borderStyleSelected : normalStyle} key={"ac" + index.toString()}>
                  <TouchableHighlight onPress={() => this.clickImage(item.fr)} underlayColor="white">
                    <Image
                      resizeMode={"stretch"}
                      source={item.path}
                      style={{
                        width: _ImageWidth - 6,
                        height: _ImageWidth - 6
                      }}
                    />
                  </TouchableHighlight>
                </View>
              );
            })}
          </ScrollView>
          <View style={thisstyles.absolute}>
            <Button
              color={"green"}
              title={"Valider" + stillNeeded}
              disabled={disabledButton}
              onPress={() => {
                let _serie = image_serieFromImages(
                  selectedImages,
                  this.state.serieName,
                  this.props.options.nbrOfQuestionPerSerie,
                  this.props.options.nbrOfImagePerQuestion,
                  this.props.options.displayLg,
                  this.props.options.level
                );

                this.setState(
                  {
                    serieName: null,
                    modal: { show: false, images: null }
                  },
                  () => {
                    this.props.navigation.navigate("TrainSerie", {
                      serie: _serie
                    });
                  }
                );
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };
}

function mapStatetoProps(data) {
  return {
    currentUser: data.users.current,
    options: data["options"]
  };
}

import * as actions from "language_therapy/src/redux/actions";
import { connect } from "react-redux";
import { thisExpression } from "@babel/types";

export default connect(mapStatetoProps, actions)(MotImage);

const thisstyles = StyleSheet.create({
  title: {
    fontSize: 23,
    margin: 5
  },
  subtitle: {
    fontSize: 18
  },
  absolute: {
    zIndex: 99999,
    position: "absolute",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 5,
    bottom: 5
  },

  item: {
    margin: 5
  }
});
