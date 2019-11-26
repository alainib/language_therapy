import React from "react";
import { View, Button, ScrollView, StyleSheet, Text } from "react-native";

import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";
import { Slider } from "react-native-elements";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ justifyContent: "space-around" }}>
        <View>
          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Niveau :</Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.level == Config._const.easy ? "green" : "grey"}
                  title="Facile"
                  onPress={() => this.props.action_optionUpdate("level", null, Config._const.easy)}
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.level == Config._const.middle ? "green" : "grey"}
                  title="Moyen"
                  onPress={() => this.props.action_optionUpdate("level", null, Config._const.middle)}
                />
              </View>

              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.level == Config._const.hard ? "green" : "grey"}
                  title="Dur"
                  onPress={() => this.props.action_optionUpdate("level", null, Config._const.hard)}
                />
              </View>
            </View>
          </View>
          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Langue :</Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.displayLg == Config._const.fr ? "green" : "grey"}
                  title={Config._const.fr}
                  onPress={() => this.props.action_optionUpdate("displayLg", null, Config._const.fr)}
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.displayLg == Config._const.ar ? "green" : "grey"}
                  title={Config._const.ar}
                  onPress={() => this.props.action_optionUpdate("displayLg", null, Config._const.ar)}
                />
              </View>
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Choix de plusieurs series :</Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.multiSeries ? "green" : "grey"}
                  title={"OUI"}
                  onPress={() => {
                    this.props.action_optionUpdate("multiSeries", null, true);
                    this.props.action_optionUpdate("manualChooseImage", null, false);
                    this.props.action_optionUpdate("imageByImage", null, false);
                  }}
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={!this.props.options.multiSeries ? "green" : "grey"}
                  title={"NON"}
                  onPress={() => this.props.action_optionUpdate("multiSeries", null, false)}
                />
              </View>
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Choix des images manuel dans la serie choisie:</Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.manualChooseImage ? "green" : "grey"}
                  title={"OUI"}
                  onPress={() => {
                    this.props.action_optionUpdate("manualChooseImage", null, true);
                    this.props.action_optionUpdate("multiSeries", null, false);
                  }}
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={!this.props.options.manualChooseImage ? "green" : "grey"}
                  title={"NON"}
                  onPress={() => this.props.action_optionUpdate("manualChooseImage", null, false)}
                />
              </View>
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Afficher l'indice du mot à l'envers :</Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.showClueReversed ? "green" : "grey"}
                  title={"OUI"}
                  onPress={() => this.props.action_optionUpdate("showClueReversed", null, true)}
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={!this.props.options.showClueReversed ? "green" : "grey"}
                  title={"NON"}
                  onPress={() => this.props.action_optionUpdate("showClueReversed", null, false)}
                />
              </View>
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <View style={thisstyles.flex1rowcenter}>
              <View style={thisstyles.flex1stretchcenter}>
                <Text style={thisstyles.title}>Nombre de series :{this.props.options.nbrOfQuestionPerSerie}</Text>
              </View>
              <View style={thisstyles.flex1stretchcenter}>
                <Slider
                  value={this.props.options.nbrOfQuestionPerSerie}
                  minimumValue={3}
                  maximumValue={50}
                  step={1}
                  onValueChange={value => {
                    this.props.action_optionUpdate("nbrOfQuestionPerSerie", null, value);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={thisstyles.bloc}>
            <Text style={thisstyles.title}>Mode image par image : </Text>
            <View style={thisstyles.bloc}>
              <View style={thisstyles.viewButton}>
                <Button
                  color={this.props.options.imageByImage ? "green" : "grey"}
                  title={"OUI"}
                  onPress={() => {
                    this.props.action_optionUpdate("imageByImage", null, true);
                    this.props.action_optionUpdate("nbrOfImagePerQuestion", null, 1);
                  }}
                />
              </View>
              <View style={thisstyles.viewButton}>
                <Button
                  color={!this.props.options.imageByImage ? "green" : "grey"}
                  title={"NON"}
                  onPress={() => {
                    this.props.action_optionUpdate("imageByImage", null, false);
                    this.props.action_optionUpdate("nbrOfImagePerQuestion", null, 4);
                  }}
                />
              </View>
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <View style={thisstyles.flex1rowcenter}>
              <View style={thisstyles.flex1stretchcenter}>
                <Text style={thisstyles.title}>Nombre d'images par serie :{this.props.options.nbrOfImagePerQuestion}</Text>
              </View>
              {!this.props.options.imageByImage && (
                <View style={thisstyles.flex1stretchcenter}>
                  <Slider
                    value={this.props.options.nbrOfImagePerQuestion}
                    minimumValue={2}
                    maximumValue={8}
                    step={1}
                    onValueChange={value => {
                      this.props.action_optionUpdate("nbrOfImagePerQuestion", null, value);
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <View style={thisstyles.flex1rowcenter}>
              <View style={thisstyles.flex1stretchcenter}>
                <Text style={thisstyles.title}>Lire le mot après X réponses fausses :{this.props.options.playSoundAfterXWrong}</Text>
              </View>
              <View style={thisstyles.flex1stretchcenter}>
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
            </View>
          </View>

          <View style={thisstyles.bloc}>
            <View style={thisstyles.flex1rowcenter}>
              <View style={thisstyles.flex1stretchcenter}>
                <Text
                  style={{
                    margin: 5,
                    fontSize: this.props.options.interfaceSize
                  }}
                >
                  Taille de police :{this.props.options.interfaceSize}
                </Text>
              </View>
              <View style={thisstyles.flex1stretchcenter}>
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
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 30 }}>
          <Button color={"orange"} title="Reset" onPress={() => this.props.action_optionReset()} />
          <Button color={"blue"} title="Fermer" onPress={() => this.props.navigation.goBack()} />
        </View>
      </ScrollView>
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
  padding510: { padding: 5, paddingTop: 10, paddingBottom: 10 },
  m5: { margin: 5, backgroundColor: "green" },
  title: {
    fontSize: 23,
    margin: 5
  },
  bloc: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5
  },
  titleEntry: {
    fontSize: 18,
    margin: 5
  },
  viewButton: {
    padding: 3,
    height: 50,
    width: 75
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
