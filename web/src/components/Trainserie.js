import React, { Component } from "react";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import ResultsStat from "./ResultsStat";
import { Container, Row, Col, Button } from "react-bootstrap";
import Config from "../Config";
import { image_randomSerie } from "../services/image";
import { FaVolumeUp, FaArrowRight, FaArrowLeft } from "react-icons/fa";

class Trainserie extends Component {
  constructor(props) {
    super(props);
    const serieName = this.props.match.params.id;
    this.state = {
      serieName,
      questions: [],
      index: 0,
      ready: false
    };
  }

  async componentDidMount() {
    let res = await image_randomSerie(this.state.serieName, 10, 4, "ar", Config._const.easy);

    this.setState({ questions: res.questions, index: 0, ready: true });
  }

  chooseAnswer = imageIndex => {
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
            this.setState({ index: this.state.index + 1 });
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
  };

  playSound(name) {
    let url = "/mot-image/mp3/" + name + "_ar.mp3";
    let sound = new Audio(url);
    sound.play();
  }

  render() {
    if (!this.state.ready) {
      return <div>loading</div>;
    }

    if (this.state.index < this.state.questions.length) {
      let ImageWidth = 150;
      let question = this.state.questions[this.state.index];

      let borderStyle = { borderRadius: "20px" };

      if (question.answer.showBorder) {
        if (question.answer.correct) {
          borderStyle["border"] = "4px solid green";
        } else if (question.answer.wrong) {
          borderStyle["border"] = "4px solid red";
        }
      }

      return (
        <div style={{ margin: 20 }}>
          <h3>Requested Serie: {this.state.serieName}</h3>

          <Row>
            <Col xs={2} md={1} style={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                className="btn-nooutline"
                variant="false"
                onClick={() => {
                  if (this.state.index > 0) {
                    this.setState({ index: this.state.index - 1 });
                  }
                }}
              >
                <span style={{ color: "white" }}>{this.state.index > 0 && <FaArrowLeft size={32} />}</span>
              </Button>
            </Col>
            <Col xs={8} md={10} style={{ display: "flex", justifyContent: "center" }}>
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
              <span style={{ fontSize: "3em" }}>{question.display}</span>
            </Col>
            <Col xs={2} md={1} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="false"
                onClick={() => {
                  if (this.state.index < this.state.questions.length) {
                    this.setState({ index: this.state.index + 1 });
                  }
                }}
              >
                <span style={{ color: "white" }}>
                  <FaArrowRight size={32} />
                </span>
              </Button>
            </Col>
          </Row>

          <Row>
            {question.images.map((item, index) => {
              return (
                <Col
                  key={"im" + index.toString()}
                  xs={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={question.answer.clickedIndex == index ? borderStyle : {}}
                    onClick={() => {
                      this.chooseAnswer(index);
                    }}
                  >
                    <img className="img-max" src={item} />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
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

export default withRouter(Trainserie);
