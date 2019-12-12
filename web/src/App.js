import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

import Series from "components/Series";
import Trainserie from "components/Trainserie";
import Home from "components/Home";
import Settings from "components/Settings";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
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
              <Link className="App-link" to="/series">
                Series
              </Link>
            </Nav.Item>

            {connected && (
              <Nav.Item>
                <Link className="App-link" to="/settings">
                  Paramètres
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar>
        <div style={{ margin: 50 }}>
          {/*className="fwcontainer"*/}
          <Switch>
            <Route path="/series">
              <Series connected={connected} />
            </Route>
            <Route path="/trainserie/:id">
              <Trainserie token={token} connected={connected} />
            </Route>

            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/">
              <Home connected={connected} setToken={setToken} setConnected={setConnected} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
