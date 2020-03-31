/* eslint-disable no-console */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import { Auth } from "aws-amplify";
import Sockette from "sockette";
import Routes from "./Routes";
import config from "./config";
import "./App.css";
import janeliaLogo from "./janelia_logo.png";
import { AppContext } from "./containers/AppContext";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [appState, setAppState] = useContext(AppContext);
  const history = useHistory();
  const socket = useRef(null);
  const location = useLocation();

  const processMessage = msg => {
    console.log(msg);
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
        setAppState(
          Object.assign(appState, {
            username: session.getIdToken().payload.email
          })
        );
        userHasAuthenticated(true);
        console.log("User successfully authenticated");
        socket.current = await connectWebSocket(session);
      } catch (e) {
        if (e !== "No current user") {
          message.error("Loading error:", e);
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
  }, [setAppState]);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  if (isAuthenticating) {
    return <p>Loading</p>;
  }

  const menuLocation = `/${location.pathname.split("/")[1]}`;

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo">
          <Link to="/">NeuronBridge</Link>
        </div>
        <div className="janeliaLogo">
          <a href="http://janelia.org">
            <img src={janeliaLogo} alt="Janelia Research Campus" />
          </a>
        </div>
        <Menu
          defaultSelectedKeys={["/"]}
          selectedKeys={[menuLocation]}
          className="nav-menu"
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          {isAuthenticated && [
            <Menu.Item key="/search">
              <Link to="/search">Search</Link>
            </Menu.Item>,
            <Menu.Item key="/about">
              <Link to="/about">About</Link>
            </Menu.Item>
          ]}
          {isAuthenticated ? (
            <Menu.Item key="/logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
          ) : (
            [
              <Menu.Item key="/signup">
                <Link to="/signup">Signup</Link>
              </Menu.Item>,
              <Menu.Item key="/login">
                <Link to="/login">Login</Link>
              </Menu.Item>
            ]
          )}
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 86 }}
      >
        <div className="site-layout-background">
          {isAuthenticated && (
            <p key="username" className="login">
              Logged in as {appState.username}
            </p>
          )}
          <Routes
            appProps={{
              isAuthenticated,
              userHasAuthenticated
            }}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>HHMI ©2020</Footer>
    </Layout>
  );
}
/* eslint-enable no-console */
