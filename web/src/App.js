import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import Fullscreen from "react-full-screen";
import Categories from "pages/Categories";
import Traincategorie from "pages/Traincategorie";
import Home from "pages/Home";
import Settings from "pages/Settings";
import Androidapp from "pages/Androidapp";

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
          <Navbar bg="dark" variant="dark" className="bg-light justify-content-between">
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
                <Link className="App-link" to="/categories">
                  Categories
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
                <Link className="App-link" to="/androidapp">
                  Android
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
              <Route path="/categories">
                <Categories connected={this.state.connected} />
              </Route>
              <Route path="/traincategorie/:id">
                <Traincategorie token={this.state.token} connected={this.state.connected} />
              </Route>

              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/androidapp">
                <Androidapp />
              </Route>

              <Route path="/">
                <Home connected={this.state.connected} setToken={this.setToken} setConnected={this.setConnected} />
              </Route>
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
