import React, { Component } from "react";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import Config from "../Config";
import { image_randomSerie } from "../services/image";

class Trainserie extends Component {
  constructor(props) {
    super(props);
    const serieName = this.props.match.params.id;
    this.state = {
      serieName,
      serie: []
    };
  }

  async componentDidMount() {
    let serie = await image_randomSerie(this.state.serieName, 20, 4, "ar", Config._const.easy);
    this.setState({ serie });
  }

  render() {
    console.log(this.state.serie);
    return <h3>Requested Serie: {this.state.serieName}</h3>;
  }
}

export default withRouter(Trainserie);
