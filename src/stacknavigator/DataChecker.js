import React from "react";
import { View, Button, ScrollView, StyleSheet, Text, TouchableHighlight, Image, Modal, Alert } from "react-native";

import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";
import { sound_play } from "language_therapy/src/services/sound";
import { image_AllSeriesNames, image_allImagesFromSerie } from "language_therapy/src/services/image";

let _ImageWidth = 175;

export default class DataChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de series
      seriesNames: [],
      serieName: null,
      images: null,
      soundFr: true,
      soundAr: true
    };
  }

  async componentDidMount() {
    let seriesNames = await image_AllSeriesNames();

    this.setState({
      seriesNames
    });
  }

  /** choix de la serie thèmatique */
  chooseSerie = serieName => {
    let images = image_allImagesFromSerie(serieName);
    // si les images sont choisie à la main on ouvre la modal pour afficher celles de la serie choisie
    this.setState({ serieName, images });
  };

  render() {
    return (
      <View style={styles.flex1}>
        {this.renderSeries()}
        {this.renderSerie()}
      </View>
    );
  }

  /**
   * affiche la liste des series thematiques disponibles
   */
  renderSeries() {
    if (this.state.serieName != null) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <Text style={thisstyles.title}>Lire les sons en :</Text>
          <View style={{ margin: 10 }}>
            <Button
              color={this.state.soundFr ? "green" : "grey"}
              title="  FR  "
              onPress={() => this.setState({ soundFr: !this.state.soundFr })}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              color={this.state.soundAr ? "green" : "grey"}
              title="  AR  "
              onPress={() => this.setState({ soundAr: !this.state.soundAr })}
            />
          </View>
        </View>
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

  play(audioName) {
    if (this.state.soundFr && this.state.soundAr) {
      sound_play(audioName);
      setTimeout(() => {
        sound_play(audioName + "_ar");
      }, 2000);
    } else {
      if (this.state.soundFr) {
        sound_play(audioName);
      } else {
        sound_play(audioName + "_ar");
      }
    }
  }

  renderSerie() {
    if (this.state.serieName == null) {
      return null;
    }
    return (
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {this.state.images.map((item, index) => {
          return (
            <TouchableHighlight
              key={"ac" + index.toString()}
              onPress={() => {
                this.play(item.audio);
              }}
              underlayColor="white"
            >
              <View
                style={{
                  width: _ImageWidth + 100,
                  margin: 5,
                  padding: 2,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "grey"
                }}
                key={"ac" + index.toString()}
              >
                <Image
                  resizeMode={"stretch"}
                  source={item.path}
                  style={{
                    width: _ImageWidth - 6,
                    height: _ImageWidth - 6
                  }}
                />

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <IconFeather name="volume-2" style={styles.center} size={20} color="#000" />
                  <Text>{item.fr}</Text>
                  <Text>{item.ar}</Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    );
  }
}

const thisstyles = StyleSheet.create({
  title: {
    fontSize: 23,
    margin: 5
  },

  item: {
    width: 200,
    margin: 5
  }
});
