import React from "react";

import { View, Button, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Image, Modal, Alert } from "react-native";

import IconIonic from "react-native-vector-icons/Ionicons";
import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";

import {
  image_AllCategoriesNames,
  image_randomCategorie,
  image_allImagesFromCategorie,
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
      multiCategoriesNames: {},
      mode: "series",
      modal: { show: false, images: [] }
    };
  }

  initMultiCategories = () => {
    let multiCategoriesNames = { main: {}, second: {} };
    for (var i in this.state.seriesNames) {
      multiCategoriesNames.main[this.state.seriesNames[i]] = false;
      multiCategoriesNames.second[this.state.seriesNames[i]] = false;
    }
    this.setState({ multiCategoriesNames, mode: "multiseries" });
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.options.multiCategories && nextProps.options.multiCategories) {
      this.initMultiCategories();
    } else if (this.props.options.multiCategories && !nextProps.options.multiCategories) {
      this.setState({ mode: "series" });
    }
  }

  // pour encadrer en rouge ou vert la réponse sélectionner puis passer à la question suivante si juste
  _timeout = null;
  async componentDidMount() {
    this._timeout = null;
    let seriesNames = await image_AllCategoriesNames();

    this.setState(
      {
        seriesNames
      },
      () => {
        if (this.props.options.multiCategories) {
          this.initMultiCategories();
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
  chooseCategorie = async serieName => {
    // si les images ne sont pas choisie à la main le service
    // image_randomCategorie le fait automatiquement
    if (!this.props.options.manualChooseImage) {
      let res = await image_randomCategorie(
        [serieName],
        this.props.options.nbrOfItemPerCategorie,
        this.props.options.nbrOfImagePerItem,
        this.props.options.displayLg,
        this.props.options.level
      );

      this.props.navigation.navigate("TrainCategorie", { serie: res });
    } else {
      let images = image_allImagesFromCategorie(serieName);
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

  chooseMultiCategorie(cat, seriename) {
    let multiCategoriesNames = { ...this.state.multiCategoriesNames };

    multiCategoriesNames[cat][seriename] = !multiCategoriesNames[cat][seriename];

    this.setState({ multiCategoriesNames });
  }
  resetMultiCategories = () => {
    this.initMultiCategories();
  };
  goMultiCategories = async () => {
    let seriesName = [];
    for (var i in this.state.multiCategoriesNames.main) {
      if (this.state.multiCategoriesNames.main[i]) {
        seriesName.push(i);
      }
    }
    let res = await image_randomCategorie(
      seriesName,
      this.props.options.nbrOfItemPerCategorie,
      this.props.options.nbrOfImagePerItem,
      this.props.options.displayLg,
      this.props.options.level
    );

    this.props.navigation.navigate("TrainCategorie", { serie: res });
  };

  /**
   * affiche la liste des series thematiques disponibles
   */
  renderCategories() {
    return (
      <View style={{ flex: 9 }}>
        <Text style={thisstyles.title}>Catégories disponibles :</Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {this.state.seriesNames.map((item, index) => {
            return (
              <View style={thisstyles.item} key={"ac" + index.toString()}>
                <Button color={"green"} title={item} onPress={() => this.chooseCategorie(item)} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  testDisabled(obj) {
    for (let i in obj) {
      if (obj[i]) return true;
    }
    return false;
  }

  renderMultiCategories() {
    let main = tools.objectToArray(this.state.multiCategoriesNames.main);
    let disabled = !this.testDisabled(this.state.multiCategoriesNames.main);
    // let second = tools.objectToArray(this.state.multiCategoriesNames.second);
    return (
      <View style={{ flex: 9, flexDirection: "column" }}>
        <View style={{ flex: 1 }}>
          <Text style={thisstyles.title}>Catégories disponibles :</Text>
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
                    disabled={this.state.multiCategoriesNames.second[item.key]}
                    title={item.key}
                    onPress={() => this.chooseMultiCategorie("main", item.key)}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/*
        <View style={{ flex: 1 }}>
          <Text style={thisstyles.title}>Categorie(s) secondaire(s) :</Text>
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
                    disabled={this.state.multiCategoriesNames.main[item.key]}
                    title={item.key}
                    onPress={() => this.chooseMultiCategorie("second", item.key)}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        */}

        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 30 }}>
          <Button color={"orange"} title="Reset" onPress={() => this.resetMultiCategories()} />
          <Button color={"blue"} title="Valider" disabled={disabled} onPress={() => this.goMultiCategories()} />
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.flex1}>
        {this.renderModal()}

        <View style={{ flex: 1, flexDirection: "row" }}>
          {this.state.mode == "multiseries" ? this.renderMultiCategories() : this.renderCategories()}

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
                  this.props.options.nbrOfItemPerCategorie,
                  this.props.options.nbrOfImagePerItem,
                  this.props.options.displayLg,
                  this.props.options.level
                );

                this.setState(
                  {
                    serieName: null,
                    modal: { show: false, images: null }
                  },
                  () => {
                    this.props.navigation.navigate("TrainCategorie", {
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
    margin: 5,
    textAlign: "center"
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
