import React from "react";
import { View, Button, ScrollView, StyleSheet, Text, TouchableHighlight, Image, Modal, FlatList } from "react-native";

import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";
import { sound_play } from "language_therapy/src/services/sound";
import { image_AllCategoriesNames, image_allImagesFromCategorie } from "language_therapy/src/services/image";

const _ImageWidth = 175;
const _ItemWidth = _ImageWidth + 100;
const _itemsPerRow = Math.floor(Config.width / _ItemWidth);

export default class DataChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de categories
      categoriesNames: [],
      categorieName: null,
      images: null,
      soundFr: true,
      soundAr: true
    };
  }

  async componentDidMount() {
    let categoriesNames = await image_AllCategoriesNames();

    this.setState({
      categoriesNames
    });
  }

  /** choix de la categorie thèmatique */
  chooseCategorie = categorieName => {
    let images = image_allImagesFromCategorie(categorieName, true);
    // si les images sont choisie à la main on ouvre la modal pour afficher celles de la categorie choisie
    this.setState({ categorieName, images });
  };

  render() {
    return (
      <View style={styles.flex1BG}>
        {this.renderCategories()}
        {this.renderCategorie()}
      </View>
    );
  }

  /**
   * affiche la liste des categories thematiques disponibles
   */
  renderCategories() {
    if (this.state.categorieName != null) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <Text style={thisstyles.title}>Categories disponibles :</Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {this.state.categoriesNames.map((item, index) => {
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

  play(audioName) {
    if (this.state.soundFr && this.state.soundAr) {
      sound_play(audioName);
      setTimeout(() => {
        sound_play(audioName + "_ar");
      }, 2000);
    } else {
      if (this.state.soundFr) {
        sound_play(audioName);
      } else if (this.state.soundAr) {
        sound_play(audioName + "_ar");
      }
    }
  }

  renderCategorie() {
    if (this.state.categorieName == null) {
      return null;
    }
    return (
      <View Style={{ padding: 15 }}>
        <FlatList
          ListHeaderComponent={
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
          }
          data={this.state.images}
          numColumns={_itemsPerRow}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          initialNumToRender={10}
          removeClippedSubviews={true}
          style={thisstyles.mlgrid}
          refreshing={false}
          removeClippedSubviews={true}
          contentContainerStyle={thisstyles.flexGrow1}
        />
      </View>
    );
  }

  renderItem(item, index) {
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
            width: _ItemWidth,
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
  },
  mlgrid: {
    marginLeft: 5
  },
  flexGrow1: { flexGrow: 1 }
});

/*
old render with flatlist

  renderCategorieSV() {
    if (this.state.categorieName == null) {
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

*/
