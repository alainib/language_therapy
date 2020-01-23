import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import Fullscreen from "react-full-screen";
import Categories from "pages/Categories";
import Traincategorie from "pages/Traincategorie";
import Home from "pages/Home";
import Settings from "pages/Settings";
import Apropos from "pages/Apropos";
import Explorer from "pages/Explorer";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { GoScreenFull, GoScreenNormal } from "react-icons/go";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      token: false,
      isFullScreen: false,
      // bug a cause de router
      isFullScreenTest: 0
    };
  }

  setConnected = val => {
    this.setState({ connected: val });
  };
  setToken = token => {
    this.setState({ token });
  };

  setIsFullScreen = val => {
    if (val === false) {
      this.setState({ isFullScreen: false, isFullScreenTest: 0 });
    } else {
      if (this.state.isFullScreenTest === 0 || this.state.isFullScreenTest % 3 !== 0) {
        this.setState({ isFullScreen: true, isFullScreenTest: this.state.isFullScreenTest + 1 });
      } else {
        this.setState({ isFullScreen: false, isFullScreenTest: 0 });
      }
    }
  };

  renderRouter() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark" className="bg-light  ">
            <Nav className="mr-auto">
              <Navbar.Brand>
                <Link className="App-link" to="/">
                  Arabaphasie
                </Link>
              </Navbar.Brand>
              <Nav.Item>
                <Link className="App-link" to="/">
                  Accueil
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link className="App-link" to="/categories/train">
                  Entrainement
                </Link>
              </Nav.Item>

              {this.state.connected && (
                <Nav.Item>
                  <Link className="App-link" to="/settings">
                    Paramètres
                  </Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Link className="App-link" to="/categories/explorer">
                  Explorateur
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link className="App-link" to="/Apropos">
                  Informations
                </Link>
              </Nav.Item>
            </Nav>

            <Nav.Item>
              <Button
                variant="dark"
                color="#09d3ac"
                onClick={() => {
                  this.setIsFullScreen(true);
                }}
              >
                {this.state.isFullScreen ? <GoScreenNormal size={32} /> : <GoScreenFull size={32} />}
              </Button>
            </Nav.Item>
          </Navbar>

          <div style={{ margin: 50 }}>
            <Switch>
              <Route path="/categories/train" render={props => <Categories link="traincategorie" connected={this.state.connected} />} />
              <Route
                path="/traincategorie/:id"
                render={props => <Traincategorie token={this.state.token} connected={this.state.connected} />}
              />
              <Route path="/categories/explorer" render={props => <Categories link="explorer" connected={this.state.connected} />} />
              <Route path="/explorer/:id" render={props => <Explorer categorieName={props.match.params.id} />} />
              <Route path="/settings" component={Settings}></Route>
              <Route path="/Apropos" component={Apropos}></Route>

              <Route
                path="/"
                render={props => (
                  <Home
                    location={props.location}
                    connected={this.state.connected}
                    setToken={this.setToken}
                    setConnected={this.setConnected}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  render() {
    if (this.state.isFullScreen) {
      return (
        <Fullscreen enabled={true} onChange={val => this.setIsFullScreen(val)}>
          {this.renderRouter()}
        </Fullscreen>
      );
    } else {
      return this.renderRouter();
    }
  }
}
