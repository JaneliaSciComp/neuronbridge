import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import Sockette from "sockette";
import Routes from "./Routes";
import config from "./config";
import "./App.css";
import "antd/dist/antd.css";
import "tachyons/css/tachyons.css";
import MyProvider from "./containers/MyProvider";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [username, setUsername] = useState([]);
  const socket = useRef(null);

  const processMessage = message => {
    console.log(message);
  };

  // Execute this once after the page is loaded
  // to get the username and establish a web socket
  useEffect(() => {
    async function connectWebSocket(session) {
      return new Sockette(
        `${config.apiGateway.WSS_URL}?token=${session.accessToken.jwtToken}`,
        {
          timeout: 5000,
          maxAttempts: 3,
          onopen: () => console.log("Connected to WebSocket"),
          onmessage: e => processMessage(e),
          onreconnect: () => console.log("Reconnecting to WebSocket..."),
          onmaximum: () => console.log("Stop Attempting WebSocket connection."),
          onclose: () => console.log("Closed WebSocket"),
          onerror: e => console.log("Error from WebSocket:", e)
        }
      );
    }

    async function onLoad() {
      try {
        const session = await Auth.currentSession();
        setUsername(session.getIdToken().payload.email);
        userHasAuthenticated(true);
        console.log("User successfully authenticated");
        socket.current = await connectWebSocket(session);
      } catch (e) {
        if (e !== "No current user") {
          console.log("Loading error:", e);
          alert("Error logging in");
        }
      }

      setIsAuthenticating(false);

      return () => {
        console.log("Cleaning WebSocket");
        if (socket.current) {
          socket.current.close();
        }
        socket.current = null;
      };
    }

    onLoad();
  }, []);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating && (
      <MyProvider>
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/login">NeuronBridge</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              {isAuthenticated ? (
                <Nav className="mr-auto">
                  <LinkContainer to="/search/lines">
                    <NavItem>Search</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <NavItem>About</NavItem>
                  </LinkContainer>
                </Nav>
              ) : (
                <Nav> </Nav>
              )}
              <Nav pullRight>
                {isAuthenticated ? (
                  <>
                    <p className="navbar-text">Logged in as {username}</p>
                    <NavItem onClick={handleLogout}>Logout</NavItem>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes
            appProps={{
              isAuthenticated,
              userHasAuthenticated
            }}
          />
        </div>
      </MyProvider>
    )
  );
}

export default withRouter(App);
