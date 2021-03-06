import React from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

import { Button as ButtonRNE } from "react-native-elements";
import Config from "language_therapy/src/Config";
import IconFA from "react-native-vector-icons/FontAwesome";
import * as tools from "language_therapy/src/tools";
import { Separator } from "language_therapy/src/components/Separator";

import ModalHeader from "language_therapy/src/components/ModalHeader";
import { Slider } from "react-native-elements";

import styles from "language_therapy/src/styles";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  resetIcon = () => {
    return (
      <ButtonRNE
        titleStyle={styles.textColorOrange}
        buttonStyle={styles.transparentButton}
        title="Reset"
        onPress={() => this.props.action_optionReset()}
      />
    );
  };

  render() {
    return (
      <View style={styles.flex1BG}>
        <ModalHeader title="Options" callbackClickBackButton={this.props.navigation.goBack} rightIcon={this.resetIcon} removeLeftSpace />

        <ScrollView contentContainerStyle={{ justifyContent: "space-around", ...styles.BG }}>
          <View>
            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Niveau :</Text>
              <View style={thisstyles.blocRight}>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.level == Config._const.middle ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    titleStyle={this.props.options.level == Config._const.easy ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title="Facile"
                    onPress={() => this.props.action_optionUpdate("level", null, Config._const.easy)}
                  />
                </View>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.level == Config._const.middle ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    titleStyle={this.props.options.level == Config._const.middle ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title="Moyen"
                    onPress={() => this.props.action_optionUpdate("level", null, Config._const.middle)}
                  />
                </View>

                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.level == Config._const.middle ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    titleStyle={this.props.options.level == Config._const.hard ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title="Dur"
                    onPress={() => this.props.action_optionUpdate("level", null, Config._const.hard)}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() =>
                    Alert.alert(
                      "Niveau",
                      "FACILE: il n'y a qu'une seule image de la catégorie choisie et c'est la juste.\n\n" +
                        "MOYEN: les images sont un mélanges entre celle de la catégorie choisie et d'autres catégories.\n\n" +
                        "DUR: toutes les images sont de la catégorie choisie."
                    )
                  }
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />
            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Langue :</Text>
              <View style={thisstyles.blocRight}>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.displayLg == Config._const.fr ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Français"}
                    onPress={() => this.props.action_optionUpdate("displayLg", null, Config._const.fr)}
                  />
                </View>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.displayLg == Config._const.ar ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Arabe"}
                    onPress={() => this.props.action_optionUpdate("displayLg", null, Config._const.ar)}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() => Alert.alert("Langue", "Langue dans la quelle sont affichés le nom des items.")}
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />
            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Choix de plusieurs catégories :</Text>
              <View style={thisstyles.blocRight}>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.multiCategories ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Oui"}
                    onPress={() => {
                      this.props.action_optionUpdate("multiCategories", null, true);
                      this.props.action_optionUpdate("manualChooseImage", null, false);
                      this.props.action_optionUpdate("imageByImage", null, false);
                    }}
                  />
                </View>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={!this.props.options.multiCategories ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Non"}
                    onPress={() => this.props.action_optionUpdate("multiCategories", null, false)}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() =>
                    Alert.alert(
                      "Choix de plusieurs catégories",
                      "Permet de choisir plusieurs catégories. Les items seront piochés aléatoirement parmis elles."
                    )
                  }
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />
            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Choix des images manuel dans la catégorie choisie :</Text>
              <View style={thisstyles.blocRight}>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.manualChooseImage ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Oui"}
                    onPress={() => {
                      this.props.action_optionUpdate("manualChooseImage", null, true);
                      this.props.action_optionUpdate("multiCategories", null, false);
                    }}
                  />
                </View>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={!this.props.options.manualChooseImage ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Non"}
                    onPress={() => this.props.action_optionUpdate("manualChooseImage", null, false)}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() =>
                    Alert.alert(
                      "Choix manuel des images parmis une catégorie choisie",
                      "Permet de choisir une catégorie puis manuellement les images une par une."
                    )
                  }
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />
            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Afficher la traduction du mot à l'envers :</Text>
              <View style={thisstyles.blocRight}>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.showClueReversed ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Oui"}
                    onPress={() => this.props.action_optionUpdate("showClueReversed", null, true)}
                  />
                </View>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={!this.props.options.showClueReversed ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Non"}
                    onPress={() => this.props.action_optionUpdate("showClueReversed", null, false)}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() =>
                    Alert.alert(
                      "Afficher la traduction du mot à l'envers",
                      "Affiche la traduction du mot (si en arabe) à l'envers dans le coin droit de l'écran pour une utilisation face à face avec le patient."
                    )
                  }
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>

            <Separator />

            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Nombre d'items par categorie : {this.props.options.nbrOfItemPerCategorie}</Text>
              <View style={thisstyles.blocRight}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={this.props.options.nbrOfItemPerCategorie}
                    minimumValue={3}
                    maximumValue={50}
                    step={1}
                    onValueChange={value => {
                      this.props.action_optionUpdate("nbrOfItemPerCategorie", null, value);
                    }}
                  />
                </View>
                <TouchableOpacity style={thisstyles.touchableQuestion} onPress={() => Alert.alert("Nombre d'item par categorie")}>
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />
            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Mode image par image : </Text>
              <View style={thisstyles.blocRight}>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={this.props.options.imageByImage ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Oui"}
                    onPress={() => {
                      this.props.action_optionUpdate("imageByImage", null, true);
                      this.props.action_optionUpdate("nbrOfImagePerItem", null, 1);
                    }}
                  />
                </View>
                <View style={thisstyles.viewButton}>
                  <ButtonRNE
                    titleStyle={!this.props.options.imageByImage ? styles.textColorGreen : styles.textColorGrey}
                    buttonStyle={styles.transparentButton}
                    title={"Non"}
                    onPress={() => {
                      this.props.action_optionUpdate("imageByImage", null, false);
                      this.props.action_optionUpdate("nbrOfImagePerItem", null, 4);
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() =>
                    Alert.alert(
                      "Mode image par image",
                      "Affiche une seule image par item. L'image n'est plus clickable et la réponse juste doit être validée avec le signe ✓"
                    )
                  }
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            {this.props.options.imageByImage && (
              <View style={thisstyles.bloc}>
                <Text style={thisstyles.title}>{"     "}- Afficher le nom de l'item : </Text>
                <View style={thisstyles.blocRight}>
                  <View style={thisstyles.viewButton}>
                    <ButtonRNE
                      titleStyle={this.props.options.imageByImageDisplayName ? styles.textColorGreen : styles.textColorGrey}
                      buttonStyle={styles.transparentButton}
                      title={"Oui"}
                      onPress={() => {
                        this.props.action_optionUpdate("imageByImageDisplayName", null, true);
                      }}
                    />
                  </View>
                  <View style={thisstyles.viewButton}>
                    <ButtonRNE
                      titleStyle={!this.props.options.imageByImageDisplayName ? styles.textColorGreen : styles.textColorGrey}
                      buttonStyle={styles.transparentButton}
                      title={"Non"}
                      onPress={() => {
                        this.props.action_optionUpdate("imageByImageDisplayName", null, false);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={thisstyles.touchableQuestion}
                    onPress={() =>
                      Alert.alert("Mode image par image", "Affiche le nom de l'item ou remplace le nom de l'item par des underscores.")
                    }
                  >
                    <IconFA name="question" size={18} color={"black"} margin={2} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <Separator />

            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Nombre d'images par item : {this.props.options.nbrOfImagePerItem}</Text>
              <View style={thisstyles.blocRight}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  {!this.props.options.imageByImage && (
                    <View style={thisstyles.flex1stretchcenter}>
                      <Slider
                        value={this.props.options.nbrOfImagePerItem}
                        minimumValue={2}
                        maximumValue={8}
                        step={1}
                        onValueChange={value => {
                          this.props.action_optionUpdate("nbrOfImagePerItem", null, value);
                        }}
                      />
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() => Alert.alert("Nombre d'images par item", "Nombre d'images affichées pour chaque item.")}
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />

            <View style={thisstyles.bloc}>
              <Text style={thisstyles.title}>Lire le mot après X réponses fausses : {this.props.options.playSoundAfterXWrong}</Text>
              <View style={thisstyles.blocRight}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={this.props.options.playSoundAfterXWrong}
                    minimumValue={1}
                    maximumValue={8}
                    step={1}
                    onValueChange={value => {
                      this.props.action_optionUpdate("playSoundAfterXWrong", null, value);
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() =>
                    Alert.alert(
                      "Lire le mot après X réponses fausses ",
                      "Après X fausses réponses le nom de l'item est automatiquement lu à chaque nouvelle mauvaise réponse."
                    )
                  }
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />

            <View style={thisstyles.bloc}>
              <Text
                style={{
                  margin: 5,
                  fontSize: this.props.options.interfaceSize
                }}
              >
                Taille de police : {this.props.options.interfaceSize}
              </Text>
              <View style={thisstyles.blocRight}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                  <Slider
                    value={this.props.options.interfaceSize}
                    minimumValue={20}
                    maximumValue={70}
                    step={1}
                    onValueChange={value => {
                      this.props.action_optionUpdate("interfaceSize", null, value);
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={thisstyles.touchableQuestion}
                  onPress={() => Alert.alert("Taille de police", "Permet de changer la taille du nom des items.")}
                >
                  <IconFA name="question" size={18} color={"black"} margin={2} />
                </TouchableOpacity>
              </View>
            </View>
            <Separator />
          </View>
          {/*
          <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 30 }}>
            <ButtonRNE
              titleStyle={styles.textColorOrange}
              buttonStyle={styles.transparentButton}
              title="Reset"
              onPress={() => this.props.action_optionReset()}
            />
            <ButtonRNE
              titleStyle={styles.textColorGreen}
              buttonStyle={styles.transparentButton}
              title="Fermer"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>*/}
        </ScrollView>
      </View>
    );
  }
}

function mapStatetoProps(data) {
  return {
    options: data["options"]
  };
}

import * as actions from "language_therapy/src/redux/actions";
import { connect } from "react-redux";
export default connect(mapStatetoProps, actions)(Options);

const thisstyles = StyleSheet.create({
  touchableQuestion: {
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    width: 30
  },
  padding510: { padding: 5, paddingTop: 10, paddingBottom: 10 },
  m5: { margin: 5, backgroundColor: "green" },
  title: {
    flex: 1,
    color: Config.colors.grey,
    //  fontFamily: Config.fonts("sfprotextregular"),
    fontSize: Config.textSize.l,
    margin: 5
  },
  bloc: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 5
  },

  blocRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 5
  },
  titleEntry: {
    fontSize: 18,
    margin: 5
  },
  viewButton: {
    height: 50,
    minWidth: 75
  },
  item: {
    width: 175,
    height: 75,
    margin: 5
  },
  flex1stretchcenter: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  flex1rowcenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
