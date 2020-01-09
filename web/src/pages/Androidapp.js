import React, { Component } from "react";
import "App.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        L'application pour smartphone et tablette est également disponilbe <i>(Android uniquement)</i>.
        <br />
        <i className="smallText">
          Pour de plus amples informations me contactez sur{" "}
          <span className="e-mail" data-user="nialamiharbi " data-website="moc.liamg"></span>
        </i>
        <br />
        <br />
        <ul style={{ listStyleType: "circle" }}>
          <li>Elle est complétement hors ligne donc pas besoin d'internet pour fonctionner.</li>

          <li>Elle intégre les 9 catégories suivantes :</li>

          <ul style={{ listStyleType: "none" }}>
            <li>Aliments ( 53 items ) </li>
            <li>Animaux ( 53 items ) </li>
            <li>Nombres ar ( 10 items ) </li>
            <li>Nombres fr ( 10 items ) </li>
            <li>Parties du corps ( 22 items ) </li>
            <li>Recette arabe ( 12 items ) </li>
            <li>Vehicules ( 10 items ) </li>
            <li>Vetements ( 16 items ) </li>
            <li>Autre ( 108 items ) </li>
          </ul>

          <br />
          <li>
            Elle permet la gestion des utilisateurs ainsi que de leur suivi avec la possibilité de rejouer les séries effectuées pour voir
            la progression :
          </li>
          {/*<img src={"/screenshots/users.jpg"} className="responsive centered img-max-1000" alt="users" /> */}
          <img src={"/screenshots/suivi.jpg"} className="responsive centered img-max-1000" alt="suivi" />
          <br />
          <li>Elle possède plus d'options comme le choix multicatégories ou le choix manuel des images à trouver pour une série :</li>
          <img src={"/screenshots/options.jpg"} className="responsive centered img-max-1000" alt="options" />
          <br />

          <li>Exemple avec 3 images par planche (paramètrable de 2 à 8):</li>
          <img src={"/screenshots/serie3.jpg"} className="responsive centered img-max-1000" alt="planche avec 3 images" />
          <li>
            Exemple avec une seule image par planche, ici le nom de l'item-cible n'est pas affiché et c'est au patient de le trouver{" "}
            <span className="smallText">
              (initialement les lettres du nom sont remplacées par des tirets, on peut les révéler une par une pour l'aider, comme au jeu du
              pendu){" "}
            </span>
            :
          </li>
          <img src={"/screenshots/serieimageparimage.jpg"} className="responsive centered img-max-1000" alt="planche avec 1 image" />

          <br />

          <li>Il y a également un explorateur d'items par catégorie pour voir tout ce que l'application contient :</li>
          <img src={"/screenshots/browser.jpg"} className="responsive centered img-max-1000" alt="browser" />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </ul>
      </div>
    );
  }
}
