//Comprehension.js
import React from "react";
import {
  View,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";

import styles from "language_therapy/src/styles";
import { LineChart } from "react-native-chart-kit";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";

import {
  image_AllSeriesNames,
  image_randomSerie
} from "language_therapy/src/services/image";

import { sound_play } from "language_therapy/src/services/sound";

class MotImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser || null,
      // tous les noms de series
      seriesNames: [],
      // celle choisi par l'utilisateur
      currentSerie: this.initCurrentSerie(null),
      // permet d'afficher le nom en francais
      questionClueVisible: false
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

  componentWillReceiveProps(nextProps) {
    if (this.state.currentUser != nextProps.currentUser) {
      this.setState({ currentUser: nextProps.currentUser });
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this._timeout);
  };

  initCurrentSerie(datas = null) {
    return {
      questions: datas ? datas.questions || null : null, // liste des questions
      index: 0, //  indice de la question courrante
      display: datas ? datas.display || null : null,
      serieName: datas ? datas.serieName || null : null
    };
  }

  /** appelé lors du click sur un element de la liste */
  chooseSerie = async serieName => {
    let res = await image_randomSerie(
      serieName,
      this.props.options.nbrOfQuestionPerSerie,
      this.props.options.nbrOfImagePerQuestion,
      this.props.options.displayLg,
      this.props.options.level
    );
    this.setState({ currentSerie: this.initCurrentSerie(res) });
  };

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
    if (this.state.currentSerie.questions == null) {
      return <View style={styles.flex1}>{this.renderSeries()}</View>;
    } else {
      return this.displaySerieQuestions();
    }
  }

  _onLongPress = () => {
    this.setState({
      questionClueVisible: true
    });
  };

  _onPressOut = () => {
    this.setState({
      questionClueVisible: false
    });
  };

  // affiche les questions d'une serie
  displaySerieQuestions() {
    if (
      this.state.currentSerie.index < this.state.currentSerie.questions.length
    ) {
      const height =
        this.props.options.interfaceSize &&
        this.props.options.interfaceSize > 50
          ? this.props.options.interfaceSize
          : 50;
      console.log("height", height);

      let question = this.state.currentSerie.questions[
        this.state.currentSerie.index
      ];
      let ImageWidth = tools.round(Config.width / question.images.length - 2);

      if (ImageWidth < 75) {
        ImageWidth = tools.round(
          Config.width / (question.images.length / 2) - 20
        );
      }

      let borderStyle = {
        alignItems: "center",
        justifyContent: "center",
        width: ImageWidth,
        height: ImageWidth
      };

      let titleClueStyle = {
        alignItems: "center",
        justifyContent: "center",
        fontSize: this.props.options.interfaceSize * 0.6,
        margin: 5
      };

      if (this.props.options.showClueReversed) {
        titleClueStyle["transform"] = [{ rotate: "180deg" }];
      }

      if (question.answer.showBorder) {
        if (question.answer.correct) {
          borderStyle["borderWidth"] = 4;
          borderStyle["borderColor"] = "green";
        } else if (question.answer.wrong) {
          borderStyle["borderWidth"] = 4;
          borderStyle["borderColor"] = "red";
        }
      }
      let iconWidth =
        this.props.options.interfaceSize + 10 > 50
          ? this.props.options.interfaceSize + 10
          : 50;

      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginTop: 20,
              padding: 10,
              height,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "baseline",
              justifyContent: "space-between"
            }}
          >
            <View style={{ width: iconWidth, height }}>
              {this.state.currentSerie.index > 0 && (
                <IconFeather
                  name="arrow-left"
                  style={styles.center}
                  size={this.props.options.interfaceSize}
                  color="#000"
                  onPress={() => {
                    let { currentSerie } = this.state;
                    currentSerie.index = currentSerie.index - 1;
                    this.setState({ currentSerie });
                  }}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                height,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <IconFeather
                  name="volume-2"
                  style={styles.center}
                  size={this.props.options.interfaceSize}
                  color="#000"
                  onPress={() => {
                    sound_play(question.display);
                  }}
                />
              </View>

              <View
                style={{
                  flex: 4,
                  alignItems: "flex-end",
                  justifyContent: "center"
                }}
              >
                <TouchableHighlight
                  onLongPress={this._onLongPress}
                  onPressOut={this._onPressOut}
                  underlayColor="white"
                  style={{
                    padding: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: this.props.options.interfaceSize,
                      margin: 5
                    }}
                  >
                    {question.display}
                  </Text>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flex: 4,
                  alignItems: "flex-start",
                  justifyContent: "center"
                }}
              >
                {this.state.questionClueVisible ? (
                  <Text style={titleClueStyle}>{question.clue}</Text>
                ) : (
                  <Text style={titleClueStyle}> </Text>
                )}
              </View>
            </View>

            <View
              style={{ width: this.props.options.interfaceSize + 10, height }}
            >
              {this.state.currentSerie.index <
                this.state.currentSerie.questions.length && (
                <IconFeather
                  name="arrow-right"
                  style={styles.center}
                  size={this.props.options.interfaceSize}
                  color="#000"
                  onPress={() => {
                    let { currentSerie } = this.state;
                    currentSerie.index = currentSerie.index + 1;
                    this.setState({ currentSerie });
                  }}
                />
              )}
            </View>
          </View>

          <View style={{ flex: 8, marginTop: 15 }}>
            <View
              style={{
                flex: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              {question.images.map((item, index) => {
                return (
                  <TouchableOpacity
                    disabled={question.answer.showBorder}
                    key={"im" + index.toString()}
                    underlayColor={"grey"}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: ImageWidth,
                      height: ImageWidth,
                      backgroundColor: "white"
                    }}
                    onPress={() => {
                      this.chooseAnswer(index);
                    }}
                  >
                    {question.answer.clickedIndex == index ? (
                      <View style={borderStyle}>
                        <Image
                          resizeMode={"stretch"}
                          source={item}
                          style={{
                            width: ImageWidth - 6,
                            height: ImageWidth - 6
                          }}
                        />
                      </View>
                    ) : (
                      <Image
                        resizeMode={"stretch"}
                        source={item}
                        style={{
                          width: ImageWidth - 6,
                          height: ImageWidth - 6
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      );
    } else {
      return <View style={{ flex: 1 }}>{this.showResults()}</View>;
    }
  }

  showResults = () => {
    console.log("showResults");
    let { questions } = this.state.currentSerie;
    if (!questions) {
      return (
        <View style={styles.center}>
          <Text>Pas de question </Text>
        </View>
      );
    }
    try {
      let results = {
        total: questions.length,
        oneRep: 0,
        twoRep: 0,
        threeRep: 0,
        fourRep: 0,
        fiveAndMoreRep: 0,
        skiped: 0,
        score: 0
      };
      for (var i in questions) {
        if (questions[i].answer.correct) {
          switch (questions[i].answer.attempt) {
            case 0:
            case 1:
              results.score += 10;
              results.oneRep++;
              break;
            case 2:
              results.score += 7;
              results.twoRep++;
              break;
            case 3:
              results.score += 5;
              results.threeRep++;
              break;
            case 4:
              results.score += 3;
              results.fourRep++;
              break;
            case 5:
              results.score += 1;
              results.fiveAndMoreRep++;
              break;
            default:
              results.fiveAndMoreRep++;
          }
        } else {
          results.skiped++;
        }
      }

      this.props.action_addSerieToUser({
        currentUser: this.state.currentUser,
        currentSerie: this.state.currentSerie,
        score: results.score
      });

      let lineChartData = {
        labels: [
          "total",
          "1 rép",
          "2 rép",
          "3 rép",
          "4 rép",
          "5 ou +",
          "sautée"
        ],
        datasets: [
          {
            data: [
              results.total,
              results.oneRep,
              results.twoRep,
              results.threeRep,
              results.fourRep,
              results.fiveAndMoreRep,
              results.skiped
            ]
            /* data: [
                     results.oneRep * 100 / results.total,
                     results.twoRep * 100 / results.total,
                     results.threeRep * 100 / results.total,
                     results.fourRep * 100 / results.total,
                     results.fiveAndMoreRep * 100 / results.total,
                     results.skiped * 100 / results.total,
                     100
                 ]*/
          }
        ]
      };

      return (
        <View style={styles.center}>
          <Text>Résultat : </Text>
          <LineChart
            data={lineChartData}
            width={Dimensions.get("window").width - 40} // from react-native
            height={Dimensions.get("window").height - 100}
            chartConfig={{
              // backgroundColor: '#e26a00',
              backgroundGradientFrom: "#ffae49",
              backgroundGradientTo: "#ffae49",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    } catch (error) {
      console.log(error);
      return <Text>Erreur de calcul </Text>;
    }
  };

  chooseAnswer = imageIndex => {
    /* structure 
        question : {
                    "display": "café",
                    "clue": "café",
                    "answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
                        "showBorder": false, // afifche l'encadré ?
                        "correct": false, //réponse juste
                        "wrong": false, // réponse fausse
                        "rightIndex": 3, // index de la réponse correct
                        "attempt": -1, // nombre de tentative 
                    },
                    "images": [
                        require(_PATH + "mot-image/serie-a/09.jpg"),
                        require(_PATH + "mot-image/serie-a/10.jpg"),
                        require(_PATH + "mot-image/serie-a/11.jpg"),
                        require(_PATH + "mot-image/serie-a/12.jpg")
                    ]
                }
        */

    try {
      let currentSerie = this.state.currentSerie;
      let question = currentSerie.questions[currentSerie.index];

      question.answer.attempt++;

      question.answer.showBorder = true;
      question.answer.clickedIndex = imageIndex;
      //bonne réponse
      if (imageIndex == question.answer.rightIndex) {
        question.answer.correct = true;
        question.answer.wrong = false;
        this.setState({ currentSerie }, () => {
          this._timeout = setTimeout(() => {
            let currentSerie = this.state.currentSerie;
            currentSerie.index = currentSerie.index + 1;
            this.setState({ currentSerie });
          }, 500);
        });
      } else {
        if (
          question.answer.attempt >= this.props.options.playSoundAfterXWrong
        ) {
          sound_play(question.display);
        }
        // mauvaise réponse
        question.answer.correct = false;
        question.answer.wrong = true;
        this.setState({ currentSerie }, () => {
          this._timeout = setTimeout(() => {
            let currentSerie = this.state.currentSerie;
            let question = currentSerie.questions[currentSerie.index];
            if (question) {
              question.answer.showBorder = false;
              this.setState({ currentSerie });
            }
          }, 500);
        });
      }
    } catch (error) {
      console.log(error);
    }
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
export default connect(
  mapStatetoProps,
  actions
)(MotImage);

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
  }
});
