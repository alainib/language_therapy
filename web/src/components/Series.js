import React, { Component } from "react";
import { Link } from "react-router-dom";

import { image_AllSeriesNames } from "../services/image";

export default class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de series
      seriesNames: []
    };
  }

  async componentDidMount() {
    let seriesNames = await image_AllSeriesNames();

    this.setState({ seriesNames });
  }

  render() {
    return (
      <h2>
        Choix de la serie
        <br />
        <ul>
          {this.state.seriesNames.map((item, index) => {
            return (
              <li key={"ac" + index.toString()}>
                <Link to={`/trainserie/${item}`}>{item}</Link>
              </li>
            );
          })}
        </ul>
      </h2>
    );
  }
}
