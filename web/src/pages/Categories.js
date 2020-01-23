import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import * as actions from "redux/actions";
import { connect } from "react-redux";
import * as tools from "tools";
import "App.css";
import { image_AllCategoriesNames } from "../services/image";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tous les noms de catégories
      categoriesNames: [],
      networkError: false
    };
  }

  async componentDidMount() {
    let res = await image_AllCategoriesNames();
    if (res) {
      this.setState({ categoriesNames: res, networkError: false });
    } else {
      this.setState({ networkError: true });
    }
  }

  render() {
    return (
      <div>
        <div className="padding15">Catégories disponibles :</div>
        <br />
        {this.state.networkError ? (
          <Alert variant="danger">
            <p>
              Une erreur est survenue lors du chargement des catégories. <br />
              Essayer de rafraichir la page ( F5 )
            </p>
          </Alert>
        ) : (
          <ul className="flex-container wrap">
            {this.state.categoriesNames.map((item, index) => {
              return (
                <Link className="flex-item whiteBGBlackText" to={`/${this.props.link}/${item}`} key={item}>
                  <div className="noTextDeco" key={"ac" + index.toString()}>
                    {tools.replaceAll(tools.upperFirstLetter(item), "-", " ")}
                    <img src={`/illustrations/${item}.jpg`} className="responsive centered img-max-200 roundBorder" alt="suivi" />
                  </div>
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

export default connect(mapStatetoProps, actions)(Categories);
