import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Auth } from "aws-amplify";
import Sockette from "sockette";
import Routes from "./Routes";
import config from "./config";
import "./App.css";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [username, setUsername] = useState([]);
  const history = useHistory();
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
    history.push("/login");
  }

  if (isAuthenticating) {
    return <p>Loading</p>;
  }

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo">
          <Link to="/login">NeuronBridge</Link>
        </div>
        <Menu  className="nav-menu" theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          {isAuthenticated && [
            <Menu.Item key="1">
              <Link to="/search">Search</Link>
            </Menu.Item>,
            <Menu.Item key="2">
              <Link to="/about">About</Link>
            </Menu.Item>
          ]}
          {isAuthenticated ? [
              <p className="login">Logged in as {username}</p>,
              <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          ] : [
              <Menu.Item>
                <Link to="/signup">Signup</Link>
              </Menu.Item>,
              <Menu.Item>
                <Link to="/login">Login</Link>
              </Menu.Item>
          ]}
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 86 }}
      >
        <Routes
          appProps={{
            isAuthenticated,
            userHasAuthenticated
          }}
        />
      </Content>
      <Footer style={{ textAlign: "center" }}>HHMI ©2020</Footer>
    </Layout>
  );
}
