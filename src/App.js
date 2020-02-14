import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import { Auth, API } from "aws-amplify";
import Sockette from "sockette";
import config from './config';
import "./App.css";
import "antd/dist/antd.css";
import 'tachyons/css/tachyons.css';
import MyProvider from "./containers/MyProvider.js"
import {Button} from "antd";
//window.LOG_LEVEL='DEBUG';

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState([]);
  const socket = useRef(null);

  // Execute this once after the page is loaded
  // to get the username and establish a web socket
  useEffect(() => {

    async function connectWebSocket(session) {
      return new Sockette(
        config.apiGateway.WSS_URL+"?token="+session.accessToken.jwtToken,
        {
          timeout: 5000,
          maxAttempts: 3,
          onopen: e => console.log("Connected to WebSocket"),
          onmessage: e => processMessage(e),
          onreconnect: e => console.log("Reconnecting to WebSocket..."),
          onmaximum: e => console.log("Stop Attempting WebSocket connection."),
          onclose: e => console.log("Closed WebSocket"),
          onerror: e => console.log("Error from WebSocket:", e)
        }
      );
    }

    async function onLoad() {
      try {
        const session = await Auth.currentSession();
        setUsername(session.getIdToken().payload['email']);
        userHasAuthenticated(true);
        console.log("User successfully authenticated");
        socket.current = await connectWebSocket(session);
      }
      catch(e) {
        if (e !== 'No current user') {
          console.log("Loading error:", e);
          alert("Error logging in");
        }
      }

      setIsAuthenticating(false);

      return () => {
        console.log("Cleaning WebSocket");
        socket.current && socket.current.close();
        socket.current = null;
      };
    }

    onLoad();
  }, []);

  useEffect(() => {

    if (!isAuthenticated) return;

    // Cancel pattern from https://github.com/facebook/react/issues/14326
    let didCancel = false;

    async function fetchNotes() {
      const response = await API.get("notes", "/notes");
      if (!didCancel) { // Ignore if we started fetching something else
        setNotes(response);
        setIsLoading(false);
      }
    }

    fetchNotes();
    return () => { didCancel = true; }; // Remember if we start fetching something else
  }, [isAuthenticated]);


  const processMessage = async ({data}) => {
    // TODO: for better efficiency and scaling, the events should
    // include the entire note, and this method would just update
    // the notes state with it, without any extra queries.
    //const { eventType, noteId } = JSON.parse(data);
    // For demo purposes, just reload the notes each time:
    try {
      setNotes(await API.get("notes", "/notes"));
    }
    catch (e) {
      alert(e);
    }
  };

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
      !isAuthenticating &&
      <MyProvider>
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/login">NeuronBridge</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              {isAuthenticated ?
                <Nav
                  className = "mr-auto" >
                      <NavItem
                  eventKey = "1"
                  href = "/search/lines" >
                      Search
                      < /NavItem>
                      < NavItem
                  eventKey = "1"
                  href = "/about" >
                      About
                      < /NavItem>
                      < /Nav>
                : <Nav > < /Nav>
               }
              <Nav pullRight>
                {isAuthenticated
                  ? <>
                      <p className="navbar-text">Logged in as {username}</p>
                      <NavItem onClick={handleLogout}>Logout</NavItem>
                    </>
                  : <>
                      <LinkContainer to="/signup">
                        <NavItem>Signup</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                      </LinkContainer>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes appProps={{ isLoading, isAuthenticated, userHasAuthenticated, notes }} />
        </div>
      </MyProvider>
  );
}

export default withRouter(App);