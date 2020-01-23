import React, { Component } from "react";

import Config from "Config";
import { allImagesFromCategorie } from "services/image";

import "App.css";

export default class Explorer extends Component {
  constructor(props) {
    super(props);

    this.state = { data: null, categorieName: this.props.categorieName };
  }
  async componentDidMount() {
    let res = await allImagesFromCategorie(this.props.categorieName);
    console.log(res);
    if (res) {
      this.setState({ data: res });
    } else {
      this.setState({ networkError: true });
    }
  }

  playSound(name) {
    let url = Config.static_path + "/mot-image/mp3/" + name;
    let sound = new Audio(url);
    sound.play();
  }

  render() {
    return (
      <div>
        <div className="threecolsgrid ">
          {this.state.data &&
            this.state.data.map((item, index) => {
              return (
                <div className="cadreBlanc whiteBGBlackText" key={index}>
                  <img className="responsive centered img-max300" src={Config.static_path + item.path} />
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex"
                    }}
                  >
                    <div
                      className="pointer"
                      onClick={() => {
                        this.playSound(item.audio + ".mp3");
                      }}
                    >
                      {item.fr}
                    </div>
                    <div
                      className="pointer"
                      onClick={() => {
                        this.playSound(item.audio + "_ar.mp3");
                      }}
                    >
                      {item.ar}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
