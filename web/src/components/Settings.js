import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import "App.css";
import Config from "Config";
import { FaQuestion } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

import * as actions from "redux/actions";
import { connect } from "react-redux";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Settings
        <div className={css(styles.bloc)}>
          <div className={css(styles.title)}>Niveau :</div>
          <div className={css(styles.blocSB)}>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.level === Config._const.easy ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("level", null, Config._const.easy)}
              >
                Facile
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.level === Config._const.middle ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("level", null, Config._const.middle)}
              >
                Moyen
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.level === Config._const.hard ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("level", null, Config._const.hard)}
              >
                Dur
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <a data-tip data-for="h-niveau">
                <FaQuestion name="question" size={18} color={"white"} margin={2} />
              </a>
              <ReactTooltip multiline={true} className="opaque" id="h-niveau" place="bottom" type="light" effect="solid">
                <div className={css(styles.helpinfo)}>
                  FACILE: il n'y a qu'une seule image de la catégorie choisie et c'est la juste.
                  <br />
                  MOYEN: les images sont un mélanges entre celle de la catégorie choisie et d'autres catégories.
                  <br />
                  DUR: toutes les images sont de la catégorie choisie.
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}>Langue :</span>
          <div className={css(styles.blocSB)}>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.displayLg == Config._const.fr ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("displayLg", null, Config._const.fr)}
              >
                Francais
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.displayLg == Config._const.ar ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("displayLg", null, Config._const.ar)}
              >
                Arabe
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <a data-tip data-for="h-langue">
                <FaQuestion name="question" size={18} color={"white"} margin={2} />
              </a>
              <ReactTooltip multiline={true} className="opaque" id="h-langue" place="bottom" type="light" effect="solid">
                <div className={css(styles.helpinfo)}>Langue dans la quelle sont affichés le nom des items.</div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        {/*
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}>Choix de plusieurs catégories :</span>
          <div className={css(styles.blocSB)}>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.multiCategories ? "success" : "secondary"}
                onClick={() => {
                  this.props.action_optionUpdate("multiCategories", null, true);
                  this.props.action_optionUpdate("manualChooseImage", null, false);
                  this.props.action_optionUpdate("imageByImage", null, false);
                }}
              >
                Oui
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={!this.props.options.multiCategories ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("multiCategories", null, false)}
              >
                Non
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <a data-tip data-for="h-multicategories">
                <FaQuestion name="question" size={18} color={"white"} margin={2} />
              </a>
              <ReactTooltip multiline={true} className="opaque" id="h-multicategories" place="bottom" type="light" effect="solid">
                <div className={css(styles.helpinfo)}>
                  Permet de choisir plusieurs catégories. Les items seront piochés aléatoirement parmis elles.
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
      */}
        {/*
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}>Choix des images manuel dans la catégorie choisie :</span>
          <div className={css(styles.blocSB)}>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.manualChooseImage ? "success" : "secondary"}
                onClick={() => {
                  this.props.action_optionUpdate("manualChooseImage", null, true);
                  this.props.action_optionUpdate("multiCategories", null, false);
                }}
              >
                Oui
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={!this.props.options.manualChooseImage ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("manualChooseImage", null, false)}
              >
                Non
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <a data-tip data-for="h-manualChooseImage">
                <FaQuestion name="question" size={18} color={"white"} margin={2} />
              </a>
              <ReactTooltip multiline={true} className="opaque" id="h-manualChooseImage" place="bottom" type="light" effect="solid">
                <div className={css(styles.helpinfo)}>Permet de choisir une catégorie puis manuellement les images une par une.</div>
              </ReactTooltip>
            </div>
          </div>
        </div>
       */}
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}>Afficher la traduction du mot à l'envers :</span>
          <div className={css(styles.blocSB)}>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.showClueReversed ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("showClueReversed", null, true)}
              >
                Oui
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={!this.props.options.showClueReversed ? "success" : "secondary"}
                onClick={() => this.props.action_optionUpdate("showClueReversed", null, false)}
              >
                Non
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <a data-tip data-for="h-showClueReversed">
                <FaQuestion name="question" size={18} color={"white"} margin={2} />
              </a>
              <ReactTooltip multiline={true} className="opaque" id="h-showClueReversed" place="bottom" type="light" effect="solid">
                <div className={css(styles.helpinfo)}>
                  Affiche la traduction du mot (si en arabe) à l'envers dans le coin droit de l'écran pour une utilisation face à face avec
                  le patient.
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}>Nombre d'items par categorie : {this.props.options.nbrOfItemPerCategorie}</span>
          <input
            type="range"
            min="3"
            max="50"
            step="1"
            value={this.props.options.nbrOfItemPerCategorie}
            onChange={event => {
              this.props.action_optionUpdate("nbrOfItemPerCategorie", null, event.target.value);
            }}
            className="slider"
            id="myRange"
          ></input>

          <div className={css(styles.viewButton)}>
            <a data-tip data-for="h-nbrOfItemPerCategorie">
              <FaQuestion name="question" size={18} color={"white"} margin={2} />
            </a>
            <ReactTooltip className="opaque" id="h-nbrOfItemPerCategorie" place="left" type="light" effect="solid">
              <div className={css(styles.helpinfo)}>Nombre d'item par categorie.</div>
            </ReactTooltip>
          </div>
        </div>
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}>Mode image par image : </span>
          <div className={css(styles.blocSB)}>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={this.props.options.imageByImage ? "success" : "secondary"}
                onClick={() => {
                  this.props.action_optionUpdate("imageByImage", null, true);
                  this.props.action_optionUpdate("nbrOfImagePerItem", null, 1);
                }}
              >
                Oui
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <Button
                block
                variant={!this.props.options.imageByImage ? "success" : "secondary"}
                onClick={() => {
                  this.props.action_optionUpdate("imageByImage", null, false);
                  this.props.action_optionUpdate("nbrOfImagePerItem", null, 4);
                }}
              >
                Non
              </Button>
            </div>
            <div className={css(styles.viewButton)}>
              <a data-tip data-for="h-multicategories">
                <FaQuestion name="question" size={18} color={"white"} margin={2} />
              </a>
              <ReactTooltip className="opaque" id="h-multicategories" place="left" type="light" effect="solid">
                <div className={css(styles.helpinfo)}>
                  Affiche une seule image par item. L'image n'est plus cliquable et la réponse juste doit être validée avec le signe ✓.
                </div>
              </ReactTooltip>
            </div>
          </div>
        </div>
        {this.props.options.imageByImage && (
          <div className={css(styles.bloc)}>
            <span className={css(styles.title)}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Afficher le nom de l'item : </span>
            <div className={css(styles.blocSB)}>
              <div className={css(styles.viewButton)}>
                <Button
                  block
                  variant={this.props.options.imageByImageDisplayName ? "success" : "secondary"}
                  onClick={() => {
                    this.props.action_optionUpdate("imageByImageDisplayName", null, true);
                  }}
                >
                  Affiche
                </Button>
              </div>
              <div className={css(styles.viewButton)}>
                <Button
                  block
                  variant={!this.props.options.imageByImageDisplayName ? "success" : "secondary"}
                  onClick={() => {
                    this.props.action_optionUpdate("imageByImageDisplayName", null, false);
                  }}
                >
                  Remplace
                </Button>
              </div>
              <div className={css(styles.viewButton)}>
                <a data-tip data-for="h-imageByImageDisplayName">
                  <FaQuestion name="question" size={18} color={"white"} margin={2} />
                </a>
                <ReactTooltip className="opaque" id="h-imageByImageDisplayName" place="left" type="light" effect="solid">
                  <div className={css(styles.helpinfo)}>Affiche le nom de l'item ou remplace le nom de l'item par des underscores</div>
                </ReactTooltip>
              </div>
            </div>
          </div>
        )}
        {!this.props.options.imageByImage && (
          <div className={css(styles.bloc)}>
            <span className={css(styles.title)}>Nombre d'images par item : {this.props.options.nbrOfImagePerItem}</span>

            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={this.props.options.nbrOfImagePerItem}
              onChange={event => {
                this.props.action_optionUpdate("nbrOfImagePerItem", null, event.target.value);
              }}
              className="slider"
              id="myRange"
            ></input>

            <div className={css(styles.viewButton)}>
              <a data-tip data-for="h-nbrOfImagePerItem">
                <FaQuestion name="question" size={18} color={"white"} margin={2} />
              </a>
              <ReactTooltip className="opaque" id="h-nbrOfImagePerItem" place="left" type="light" effect="solid">
                <div className={css(styles.helpinfo)}> Nombre d'images affichées pour chaque item.</div>
              </ReactTooltip>
            </div>
          </div>
        )}
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}>Lire le mot après X réponses fausses : {this.props.options.playSoundAfterXWrong}</span>

          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={this.props.options.playSoundAfterXWrong}
            onChange={event => {
              this.props.action_optionUpdate("playSoundAfterXWrong", null, event.target.value);
            }}
            className="slider"
            id="myRange"
          ></input>

          <div className={css(styles.viewButton)}>
            <a data-tip data-for="h-playSoundAfterXWrong">
              <FaQuestion name="question" size={18} color={"white"} margin={2} />
            </a>
            <ReactTooltip className="opaque" id="h-playSoundAfterXWrong" place="left" type="light" effect="solid">
              <div className={css(styles.helpinfo)}>
                Après X fausses réponses le nom de l'item est automatiquement lu à chaque nouvelle mauvaise réponse.
              </div>
            </ReactTooltip>
          </div>
        </div>
        <div className={css(styles.bloc)}>
          <span className={css(styles.title)}> Taille de police : {this.props.options.interfaceSize}</span>

          <input
            type="range"
            min="3"
            max="10"
            step="1"
            value={this.props.options.interfaceSize}
            onChange={event => {
              this.props.action_optionUpdate("interfaceSize", null, event.target.value);
            }}
            className="slider"
            id="myRange"
          ></input>

          <div className={css(styles.viewButton)}>
            <a data-tip data-for="h-interfaceSize">
              <FaQuestion name="question" size={18} color={"white"} margin={2} />
            </a>
            <ReactTooltip className="opaque" id="h-interfaceSize" place="left" type="light" effect="solid">
              <div className={css(styles.helpinfo)}>Permet de changer la taille du nom des items.</div>
            </ReactTooltip>
          </div>
        </div>
        <div className="flex" style={{ justifyContent: "center", alignItems: "center", padding: 50 }}>
          <div style={{ minWidth: 90, maxWidth: 300 }}>
            <Button block variant={"warning"} onClick={() => this.props.action_optionReset()}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(data) {
  console.log(data);
  return {
    options: data["options"]
  };
}

export default connect(mapStatetoProps, actions)(Settings);

const styles = StyleSheet.create({
  touchableQuestion: {
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    width: 30
  },

  title: {
    fontSize: 23
  },
  helpinfo: {
    fontSize: 18,
    maxWidth: "75vw"
  },
  bloc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    marginBottom: 15
  },
  blocSB: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5
  },
  titleEntry: {
    fontSize: 18,
    margin: 5
  },
  viewButton: {
    marginLeft: 20,
    minWidth: 90
  },
  item: {
    width: 175,
    height: 75,
    margin: 5
  },
  flex1stretchcenter: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  flex1rowcenter: {
    flex: 1,
    "flex-direction": "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
