import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

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
        <ul className="flex-container wrap">
          {this.state.seriesNames.map((item, index) => {
            return (
              <li className="flex-item" key={"ac" + index.toString()}>
                <Link className="flex-item-link" to={`/trainserie/${item}`}>
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </h2>
    );
  }
}
