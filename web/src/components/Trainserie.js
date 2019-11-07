import React, { Component } from "react";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

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
    let res = await image_randomSerie(this.state.serieName, 20, 4, "ar", Config._const.easy);

    this.setState({ questions: res.questions, index: 0, ready: true });
  }

  render() {
    if (!this.state.ready) {
      return <div>loading</div>;
    }
    let ImageWidth = 150;
    let question = this.state.questions[this.state.index];

    return (
      <div style={{ margin: 20 }}>
        <h3>Requested Serie: {this.state.serieName}</h3>

        <Row>
          <Col xs={4} style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              variant="false"
              onClick={() => {
                if (this.state.index > 0) {
                  this.setState({ index: this.state.index - 1 });
                }
              }}
            >
              <span style={{ color: "white" }}>
                <FaArrowLeft size={32} />
              </span>
            </Button>
          </Col>
          <Col xs={4} style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="false">
              <div style={{ color: "white" }}>
                <FaVolumeUp size={32} />
              </div>
            </Button>
            <span style={{ fontSize: "3em" }}>{question.display}</span>
          </Col>
          <Col xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
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
                <Button
                  variant="false"
                  onClick={() => {
                    this.chooseAnswer(index);
                  }}
                >
                  <img className="img-max" src={item} />
                </Button>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default withRouter(Trainserie);
