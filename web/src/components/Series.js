import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import * as actions from "redux/actions";
import { connect } from "react-redux";
import * as tools from "tools";
import "App.css";

import { image_AllSeriesNames } from "../services/image";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de series
      seriesNames: [],
      networkError: false
    };
  }

  async componentDidMount() {
    let res = await image_AllSeriesNames();
    if (res) {
      this.setState({ seriesNames: res, networkError: false });
    } else {
      this.setState({ networkError: true });
    }
  }

  render() {
    return (
      <div>
        <h2 className="padding15">Series disponibles :</h2>
        <br />
        {this.state.networkError ? (
          <Alert variant="danger">
            <p>
              Une erreur est survenue lors du chargement des series. <br />
              Essayer de rafraichir la page ( F5 )
            </p>
          </Alert>
        ) : (
          <ul className="flex-container wrap">
            {this.state.seriesNames.map((item, index) => {
              return (
                <Link className="flex-item" to={`/trainserie/${item}`}>
                  <li className="flex-item-link" key={"ac" + index.toString()}>
                    {tools.upperFirstLetter(item)}
                    {/*   <LinkButton to={`/trainserie/${item}`}>{tools.upperFirstLetter(item)}</LinkButton> */}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

function mapStatetoProps(data) {
  return {
    options: data["options"]
  };
}

export default connect(mapStatetoProps, actions)(Series);
