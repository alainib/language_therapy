import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

import ResultsStat from "./ResultsStat";
import { Row as RowBootstrap, Col as ColBootstrap, Button, Alert } from "react-bootstrap";

import FlexView from "react-flexview";
import Config from "Config";
import { image_randomCategorie } from "services/image";
import { FaVolumeUp, FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";

import * as actions from "redux/actions";
import { connect } from "react-redux";
import { compose } from "redux";

// pour éviter les multi click successif sur la bonne réponse qui feraient avancer de plusieurs questions d'un coup
let _lastSecClicked = 0;

class Traincategorie extends Component {
  constructor(props) {
    super(props);

    const categorieName = this.props.match.params.id;
    this.state = {
      // permet d'afficher le nom en francais
      questionClueVisible: false,
      categorieName,
      // liste des questions
      questions: [],
      index: 0,
      ready: false,
      networkError: false,
      /* pour les categories d'imageByImage il ne faut pas afficher le nom en haut directement
        on peut afficher des . par lettres et a chaque click sur question.display on affiche une lettre de plus
      */
      imageByImageShowHowMuchLetters: 0
    };
  }

  timeStampSec() {
    return Math.floor(Date.now() / 1000);
  }

  async componentDidMount() {
    if (this.props.connected) {
      let res = await image_randomCategorie(
        this.props.token,
        this.state.categorieName,
        this.props.options.nbrOfItemPerCategorie,
        this.props.options.nbrOfImagePerItem,
        this.props.options.displayLg,
        this.props.options.level
      );

      if (res) {
        this.setState({ questions: res.questions, index: 0, ready: true, networkError: false });
      } else {
        this.setState({ networkError: true });
      }
    }
  }

  chooseAnswer = imageIndex => {
    let now = this.timeStampSec();
    if (now - _lastSecClicked > 1) {
      _lastSecClicked = now;
      try {
        let index = this.state.index;
        let questions = [...this.state.questions];
        let question = questions[index];

        question.answer.attempt++;
        question.answer.showBorder = true;
        question.answer.clickedIndex = imageIndex;

        //bonne réponse
        if (imageIndex === question.answer.rightIndex) {
          question.answer.correct = true;
          question.answer.wrong = false;

          this.setState({ questions }, () => {
            this._timeout = setTimeout(() => {
              //this.setState({ index: this.state.index + 1 });
              this.nextCategorie();
            }, 500);
          });
        } else {
          // mauvaise réponse
          if (question.answer.attempt >= Config.trainOptions.playSoundAfterXWrong) {
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
    }
  };

  playSound(name) {
    let url = Config.static_path + "/mot-image/mp3/" + name + "_ar.mp3";
    console.log(url);
    let sound = new Audio(url);
    sound.play();
  }

  onMouseDown = () => {
    this.setState({
      questionClueVisible: true
    });
  };

  onMouseUp = () => {
    this.setState({
      questionClueVisible: false
    });
  };
  previousCategorie() {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1, imageByImageShowHowMuchLetters: 0 });
    }
  }

  nextCategorie() {
    if (this.state.index < this.state.questions.length) {
      this.setState({ index: this.state.index + 1, imageByImageShowHowMuchLetters: 0 });
    }
  }

  imageByImageDisplay(name) {
    let res = name.slice(0, this.state.imageByImageShowHowMuchLetters);
    let rest = name.length - this.state.imageByImageShowHowMuchLetters;
    for (let i = 0; i < rest; i++) {
      res += " _";
    }
    return res;
  }

  render() {
    if (!this.props.connected) {
      return <Redirect to="/" />;
    }

    if (!this.state.ready) {
      return <div>loading</div>;
    }
    if (this.state.networkError) {
      return (
        <Alert variant="danger">
          <p>
            Une erreur est survenue lors du chargement de la categorie. <br />
            Essayer de rafraichir la page ( F5 )
          </p>
        </Alert>
      );
    }
    if (this.state.index < this.state.questions.length) {
      let question = this.state.questions[this.state.index];

      let borderStyle = { borderRadius: "20px", padding: "10px" };
      let borderStyleUnclicked = { ...borderStyle };
      if (question.answer.showBorder) {
        if (question.answer.correct) {
          borderStyle["border"] = "4px solid green";
        } else if (question.answer.wrong) {
          borderStyle["border"] = "4px solid red";
        }
      }

      const xsSize = [10, 10, 6, 4, 3, 3, 3, 3, 3, 3][question.images.length];
      console.log(xsSize);
      return (
        <FlexView style={{ margin: 20, minHeight: 600 }} column>
          <RowBootstrap>
            <ColBootstrap xs={2} md={1} style={{ display: "flex", justifyContent: "flex-start" }}>
              {this.state.index > 0 && (
                <Button
                  className="btn-nooutline"
                  variant="false"
                  onClick={() => {
                    this.previousCategorie();
                  }}
                >
                  <span style={{ color: "white" }}>
                    <FaArrowLeft size={32} />
                  </span>
                </Button>
              )}
            </ColBootstrap>
            <ColBootstrap
              xs={this.props.options.imageByImage ? 6 : 8}
              md={this.props.options.imageByImage ? 8 : 10}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Button
                variant="false"
                onClick={() => {
                  this.playSound(question.audio);
                }}
              >
                <div style={{ color: "white" }}>
                  <FaVolumeUp size={32} />
                </div>
              </Button>

              {this.props.options.imageByImage && !this.props.options.imageByImageDisplayName ? (
                <div
                  onClick={() =>
                    this.setState({
                      imageByImageShowHowMuchLetters: this.state.imageByImageShowHowMuchLetters + 1
                    })
                  }
                  style={{ fontSize: this.props.options.interfaceSize + "em" }}
                >
                  {this.imageByImageDisplay(question.display)}
                </div>
              ) : (
                <div
                  onMouseDown={this.onMouseDown}
                  onMouseUp={this.onMouseUp}
                  style={{ fontSize: this.props.options.interfaceSize + "em" }}
                >
                  {question.display}
                </div>
              )}
            </ColBootstrap>
            {this.props.options.imageByImage && (
              <ColBootstrap xs={2} md={1} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button
                  variant="false"
                  onClick={() => {
                    this.chooseAnswer(0);
                  }}
                >
                  <span style={{ color: "white" }}>
                    <FaCheck size={32} />
                  </span>
                </Button>
              </ColBootstrap>
            )}
            <ColBootstrap xs={2} md={1} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="false"
                onClick={() => {
                  this.nextCategorie();
                }}
              >
                <span style={{ color: "white" }}>
                  <FaArrowRight size={32} />
                </span>
              </Button>
            </ColBootstrap>
          </RowBootstrap>
          <div className="space50" />

          <RowBootstrap className="justify-content-md-center">
            {question.images.map((item, index) => {
              return (
                <ColBootstrap
                  key={"im" + index.toString()}
                  xs={xsSize}
                  onClick={() => {
                    !this.props.options.imageByImage && this.chooseAnswer(index);
                  }}
                >
                  <img
                    style={question.answer.clickedIndex === index ? borderStyle : borderStyleUnclicked}
                    className="responsive centered img-max"
                    src={Config.static_path + item}
                    alt={item}
                  />
                </ColBootstrap>
              );
            })}
          </RowBootstrap>
          {/*
          <Row horizontal="space-around">{fu2}</Row>
          */}

          <div className="space50" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 50
            }}
          >
            <h3>
              {this.state.categorieName + " : "}
              {this.state.index + 1 + " / " + this.state.questions.length}
            </h3>

            {this.state.questionClueVisible && <span>{question.clue}</span>}
          </div>
        </FlexView>
      );
    } else {
      return <div>{this.showResults()}</div>;
    }
  }

  showResults() {
    let { questions } = this.state;
    if (!questions) {
      return <div>Pas de question</div>;
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
      for (let i in questions) {
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

      return <ResultsStat results={results}></ResultsStat>;
    } catch (error) {
      console.warn(error);
      return <div>Erreur de calcul </div>;
    }
  }
}

//export default withRouter(Traincategorie);

function mapStatetoProps(data) {
  return {
    options: data["options"]
  };
}

export default compose(withRouter, connect(mapStatetoProps, actions))(Traincategorie);
