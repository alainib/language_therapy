import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../App.css";
import { user_login } from "../services/user";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
const cookie_id = "user_id";
const cookie_pwd = "user_pwd";

export default class Trainserie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifiant: read_cookie(cookie_id) || "",
      password: read_cookie(cookie_pwd) || "",
      connected: this.props.connected || false
    };
  }

  componentDidMount() {
    // si on re ouvre le navigateur this.props.connected == false mais on peut avoir cookie session precedente, on re connecte auto
    if (!this.props.connected && this.validateForm()) {
      this.connect();
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
      this.setState({ connected: true });
      this.props.setConnected(true);
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
      <div className="Login">
        {connected ? (
          <Form>
            <h1>{identifiant}, bienvenue sur 'Language therapy'.</h1>
            <br />
            <br />
            <Button variant="primary" type="submit" onClick={this.disconnect}>
              Déconnexion
            </Button>
          </Form>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <h1>Bienvenue sur 'Language therapy'.</h1>
            <br />
            <br />
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

            <Button variant="primary" type="submit" disabled={!this.validateForm()}>
              Connexion
            </Button>
          </Form>
        )}
      </div>
    );
  }
}