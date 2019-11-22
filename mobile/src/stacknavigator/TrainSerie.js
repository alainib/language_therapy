import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Image } from "react-native";

import styles from "language_therapy/src/styles";
import Config from "language_therapy/src/Config";
import IconFeather from "react-native-vector-icons/Feather";
import * as tools from "language_therapy/src/tools";

import ResultsStat from "language_therapy/src/components/ResultsStat";
import FlexSize from "language_therapy/src/components/FlexSize";

import { sound_play } from "language_therapy/src/services/sound";

/**
 * permet de jouer une serie de question deja crée
 *
 */
class TrainSerie extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log(props.navigation.state.params.serie);
    this.state = {
      // permet d'afficher le nom en francais
      questionClueVisible: false,
      // liste des questions
      questions: props.navigation.state.params.serie.questions,
      index: 0, // indice de la question courante
      // display: props.navigation.state.params.serie.display,
      // serieName: props.navigation.state.params.serie.serieName,
      /* pour les series d'imageByImage il ne faut pas afficher le nom en haut directement
        on peut afficher des . par lettres et a chaque click sur question.display on affiche une lettre de plus
      */
      imageByImageShowHowMuchLetters: 0
    };
  }

  playSound(name) {
    if (this.props.options.displayLg == Config._const.ar) {
      sound_play(name + "_" + this.props.options.displayLg);
    } else {
      sound_play(name);
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

  previousSerie = () => {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1, imageByImageShowHowMuchLetters: 0 });
    }
  };
  nextSerie = () => {
    this.setState({ index: this.state.index + 1, imageByImageShowHowMuchLetters: 0 });
  };

  imageByImageDisplay(name) {
    let res = name.slice(0, this.state.imageByImageShowHowMuchLetters);
    let rest = name.length - this.state.imageByImageShowHowMuchLetters;
    for (let i = 0; i < rest; i++) {
      res += "_";
    }
    return res;
  }

  render() {
    if (this.state.index < this.state.questions.length) {
      const height = this.props.options.interfaceSize && this.props.options.interfaceSize > 50 ? this.props.options.interfaceSize : 50;

      let question = this.state.questions[this.state.index];

      let borderStyle = {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        alignSelf: "stretch",
        width: undefined,
        height: undefined
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

      return (
        <View style={styles.flex1}>
          <View
            style={{
              margin: 20,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "baseline",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              onPress={this.previousSerie}
              underlayColor="grey"
              style={[
                {
                  flex: 1,
                  height,
                  alignItems: "center",
                  justifyContent: "center"
                }
              ]}
            >
              {this.state.index > 0 && (
                <IconFeather name="arrow-left" style={styles.center} size={this.props.options.interfaceSize} color="#000" />
              )}
            </TouchableOpacity>
            <View
              style={{
                flex: 6,
                marginLeft: 2,
                height,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.playSound(question.audio);
                }}
                underlayColor="grey"
                style={{
                  flex: 1,
                  height,
                  paddingHorizontal: 30,
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
                    this.playSound(question.audio);
                  }}
                />
              </TouchableOpacity>

              <View
                style={{
                  flex: 4,
                  alignItems: "flex-start",
                  justifyContent: "center"
                }}
              >
                {this.props.options.imageByImage ? (
                  <TouchableHighlight
                    onPress={() =>
                      this.setState({
                        imageByImageShowHowMuchLetters: this.state.imageByImageShowHowMuchLetters + 1
                      })
                    }
                    underlayColor="white"
                    style={{
                      padding: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f6f6f7",
                      borderRadius: 30
                    }}
                  >
                    <Text
                      style={{
                        fontSize: this.props.options.interfaceSize,
                        margin: 5
                      }}
                    >
                      {this.imageByImageDisplay(question.display)}
                    </Text>
                  </TouchableHighlight>
                ) : (
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
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={this.nextSerie}
              underlayColor="grey"
              style={[
                {
                  flex: 1,
                  height,
                  alignItems: "center",
                  justifyContent: "center"
                }
              ]}
            >
              <IconFeather
                name={
                  this.state.index + 1 < this.state.questions.length ? "arrow-right" : "trending-up" //"log-in"
                }
                style={styles.center}
                size={this.props.options.interfaceSize}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 8, marginTop: 15 }}>
            <View
              style={{
                flex: 1,
                alignSelf: "stretch",
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
                      flex: 1,
                      backgroundColor: "white",
                      padding: 2
                    }}
                    onPress={() => {
                      this.chooseAnswer(index);
                    }}
                  >
                    {question.answer.clickedIndex == index ? (
                      <View style={borderStyle}>
                        <Image
                          resizeMode={"contain"}
                          source={item}
                          style={{
                            flex: 1,
                            alignSelf: "stretch",
                            width: undefined,
                            height: undefined
                          }}
                        />
                      </View>
                    ) : (
                      <Image
                        resizeMode={"contain"}
                        source={item}
                        style={{
                          flex: 1,
                          alignSelf: "stretch",
                          width: undefined,
                          height: undefined
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height,
              margin: 2,
              marginHorizontal: 10
            }}
          >
            <Text>{this.state.index + 1 + " / " + this.state.questions.length}</Text>

            {this.state.questionClueVisible ? <Text style={titleClueStyle}>{question.clue}</Text> : <Text style={titleClueStyle}> </Text>}
          </View>
        </View>
      );
    } else {
      return <View style={styles.flex1}>{this.showResults()}</View>;
    }
  }

  showResults = () => {
    let { questions } = this.state;
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
        skiped: 0
      };
      for (var i in questions) {
        if (questions[i].answer.correct) {
          switch (questions[i].answer.attempt) {
            case 0:
            case 1:
              results.oneRep++;
              break;
            case 2:
              results.twoRep++;
              break;
            case 3:
              results.threeRep++;
              break;
            case 4:
              results.fourRep++;
              break;
            case 5:
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
        id: this.props.navigation.state.params.serie.id,
        user: this.props.currentUser,
        serie: this.props.navigation.state.params.serie,

        results
      });

      return <ResultsStat results={results}></ResultsStat>;
    } catch (error) {
      console.warn(error);
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
      let index = this.state.index;
      let questions = [...this.state.questions];
      let question = questions[index];

      question.answer.attempt++;
      question.answer.showBorder = true;
      question.answer.clickedIndex = imageIndex;

      //bonne réponse
      if (imageIndex == question.answer.rightIndex) {
        question.answer.correct = true;
        question.answer.wrong = false;

        this.setState({ questions }, () => {
          this._timeout = setTimeout(() => {
            this.nextSerie();
          }, 500);
        });
      } else {
        // mauvaise réponse
        if (question.answer.attempt >= this.props.options.playSoundAfterXWrong) {
          this.playSound(question.audio);
        }

        question.answer.correct = false;
        question.answer.wrong = true;
        this.setState({ questions }, () => {
          this._timeout = setTimeout(() => {
            let index = this.state.index;
            let questions = [...this.state.questions];
            let question = questions[index];

            if (question) {
              question.answer.showBorder = false;

              this.setState({ questions });
            }
          }, 500);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

function mapToStateProps(data) {
  return {
    currentUser: data.users.current,
    options: data["options"]
  };
}

import { connect } from "react-redux";
import * as actions from "language_therapy/src/redux/actions";

export default connect(mapToStateProps, actions)(TrainSerie);

const thisstyles = StyleSheet.create({});
