import React, { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "App.css";
import { user_login } from "services/user";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import * as tools from "tools";

const cookie_id = "user_id";
const cookie_pwd = "user_pwd";
const cookie_token = "user_token";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifiant: read_cookie(cookie_id) || "",
      password: read_cookie(cookie_pwd) || "",
      token: read_cookie(cookie_token) || "",
      connected: this.props.connected || false,
      loginError: false
    };
  }

  componentDidMount() {
    // si on re ouvre le navigateur this.props.connected == false mais on peut avoir cookie session precedente, on re connecte auto
    if (!this.props.connected && this.validateForm()) {
      this.connect();
    }

    if (this.props.location && this.props.location.pathname === "/login") {
      let params = tools.getJsonFromUrl(this.props.location.search);

      if (params.user && params.password) {
        this.setState(
          {
            identifiant: params.user,
            password: params.password
          },
          () => {
            this.connect();
          }
        );
      }
    }
  }

  setIdentifiant(identifiant) {
    this.setState({ identifiant });
  }

  setPassword(password) {
    this.setState({ password });
  }

  validateForm() {
    return this.state.identifiant && this.state.password && this.state.identifiant.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.connect();
  };

  connect = async () => {
    let res = await user_login(this.state.identifiant, this.state.password);
    if (res.status === 200) {
      bake_cookie(cookie_id, this.state.identifiant);
      bake_cookie(cookie_pwd, this.state.password);
      bake_cookie(cookie_token, res.data.token);
      this.setState({ connected: true, token: res.data.token, loginError: false });
      this.props.setConnected(true);
      this.props.setToken(res.data.token);
    } else {
      this.setState({ loginError: true });
    }
  };

  disconnect = () => {
    delete_cookie(cookie_pwd);
    this.setState({ connected: false });
    this.props.setConnected(false);
  };

  render() {
    let { connected, identifiant, password } = this.state;
    return (
      <div className="Login marginPage">
        {connected ? (
          <div className="textCenter">
            <div className="bigText">
              {identifiant}, bienvenue sur <i>Arabaphasie</i>
            </div>
            <br />
            <div className="mediumText">
              Plateforme gratuite de rééducation pour patients aphasiques bilingues franco-arabes à destination des orthophonistes non
              arabophones.
            </div>
            <br />
            <br />
            <h3>Vous avez désormais accès aux catégories.</h3>
            <br />
            <br />
            <Form>
              <Button variant="primary" type="submit" onClick={this.disconnect}>
                Déconnexion
              </Button>
            </Form>
          </div>
        ) : (
          <div className="textCenter">
            <div className="bigText">
              Bienvenue sur <i>Arabaphasie</i>
            </div>
            <br />
            <div className="mediumText">
              Plateforme gratuite de rééducation pour patients aphasiques bilingues franco-arabes à destination des orthophonistes non
              arabophone.
            </div>
            <br />
            <br />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Identifiant</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre Identifiant"
                  onChange={e => this.setIdentifiant(e.target.value)}
                  value={identifiant}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={e => this.setPassword(e.target.value)}
                />
              </Form.Group>
              <i className="smallText">
                Vous n'avez pas de compte ? contactez moi sur{" "}
                <span className="e-mail" data-user="nialamiharbi " data-website="moc.liamg"></span>
              </i>
              <br />
              <Button variant="primary" type="submit" disabled={!this.validateForm()}>
                Connexion
              </Button>
              {this.state.loginError && (
                <div>
                  <br />
                  <Alert variant="danger">
                    <i>Identifiant</i> ou <i>Mot de passe</i> erroné
                  </Alert>
                </div>
              )}
            </Form>
          </div>
        )}
      </div>
    );
  }
}
