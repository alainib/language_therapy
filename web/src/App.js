import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

import Series from "./components/Series";
import Trainserie from "./components/Trainserie";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Navbar.Brand>
              <Link className="App-link" to="/">
                Language therapy
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
            <Nav.Item>
              <Link className="App-link" to="/settings">
                Paramètres
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/series">
            <Series />
          </Route>
          <Route path="/trainserie/:id">
            <Trainserie />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function Home() {
  return <h2>Bienvenue</h2>;
}

function Settings() {
  return <h2>Settings</h2>;
}

/*
function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
*/
