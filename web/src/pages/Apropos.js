import React, { Component } from "react";
import "App.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="marginPage">
        <div className="textCenter margin25">
          Cette plateforme gratuite a été concu, par et pour les orthophonistes non arabophone, pour la rééducation de patients aphasiques
          bilingues franco-arabes.
          <div className="margin25 mediumText">
            <i>
              Pour toutes informations me contactez sur <span className="e-mail" data-user="nialamiharbi " data-website="moc.liamg"></span>
            </i>
          </div>
        </div>

        <br />
        <div className="twocolsgrid">
          <div className="cadre animated zoomIn">
            <div className="text">
              Elle permet la création de série d'entrainement aléatoire par catégorie sémantique avec différents niveaux de difficulté. Elle
              affiche en arabe la partie destinée au patient et en français celle à l'orthophoniste.
            </div>

            <img src={"/screenshots/web/seriea.jpg"} className="responsive centered img-max-1000" alt="suivi" />

            <i className="smallText">
              Le nom de l'item dont il faut trouver l'image correspondante est écrit en arabe, en haut au centre, et il possible d'afficher
              sa signification en français en bas à droite en cliquant sur le premier.
            </i>
          </div>
          <div className="cadre animated zoomIn">
            <div className="text">
              Elle intégre les 9 catégories suivantes :<br />
              <ul style={{ listStyleType: "circle" }}>
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
              <i className="smallText">Avec enregistrements sonores en français et en arabe pour chaque items</i>
            </div>
          </div>
          <div className="cadre animated zoomIn">
            <div className="text">
              Elle est paramètrable notamment pour :<br />
              <ul style={{ listStyleType: "circle" }}>
                <li>Niveau : facile, moyen et difficile</li>
                <li>Langue d'affichage de l'item</li>
                <li>Nombre d'items par serie </li>
                <li>Mode image par image </li>
                <li>Nombre d'images par item </li>
                <li>Le nombre de réponses fausses avant la lecture du nom de l'item</li>
                <li>Taille de police </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="textCenter">
          L'application pour smartphone et tablette est également disponilbe <i>(Android uniquement)</i>.
        </div>
        <br />

        <br />
        <br />
        <div className="twocolsgrid">
          <div className="cadre animated zoomIn">
            <div className="text">Elle est complétement hors ligne donc pas besoin d'internet pour fonctionner.</div>
            <img src={"/screenshots/mobile/both.jpg"} className="responsive centered img-max-1000" alt="both" />
          </div>

          <div className="cadre animated zoomIn">
            <div className="text">
              Elle permet la gestion des utilisateurs ainsi que de leur suivi avec la possibilité de rejouer les séries effectuées pour voir
              la progression :
            </div>

            <img src={"/screenshots/mobile/suivi.jpg"} className="responsive centered img-max-1000" alt="suivi" />
          </div>

          <div className="cadre animated zoomIn">
            <div className="">
              Elle possède plus d'options comme le choix multicatégories ou le choix manuel des images à trouver pour une série :
            </div>
            <img src={"/screenshots/mobile/options.jpg"} className="responsive centered img-max-1000" alt="options" />
          </div>

          <div className="cadre animated zoomIn">
            <div className="text">
              Exemple avec 3 images par planche <span className="smallText">(paramètrable de 2 à 8 pour varier la complexité)</span>
            </div>
            <img src={"/screenshots/mobile/serie3.jpg"} className="responsive centered img-max-1000" alt="planche avec 3 images" />
          </div>
          <div className="cadre animated zoomIn">
            <div className="text">
              Exemple avec une seule image par planche, ici le nom de l'item-cible n'est pas affiché et c'est au patient de le trouver{" "}
            </div>
            <img
              src={"/screenshots/mobile/serieimageparimage.jpg"}
              className="responsive centered img-max-1000"
              alt="planche avec 1 imag e"
            />
            <span className="smallText">
              Initialement les lettres du nom sont remplacées par des tirets, on peut les révéler une par une pour l'aider, comme au jeu du
              pendu.
            </span>
          </div>
          <div className="cadre animated zoomIn">
            <div className="text">Il y a également un explorateur d'items par catégorie pour voir tout ce que l'application contient</div>
            <img src={"/screenshots/mobile/browser.jpg"} className="responsive centered img-max-1000" alt="browser" />
          </div>
        </div>
        <div className="textCenter margin25 smallText">Dernière mise à jour : Le 24/01/2020</div>
      </div>
    );
  }
}
