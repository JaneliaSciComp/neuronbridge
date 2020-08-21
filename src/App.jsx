import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import LoggedInAs from "./components/LoggedInAs";
import "./App.css";
import config from "./config";
import janeliaLogo from "./janelia_logo.png";
import flyemLogo from "./flyemLogo.png";
import flylightLogo from "./flylightlogo.png";
import neuronbridgeLogo from "./neuronbridge_logo.png";
import { AppContext } from "./containers/AppContext";
import HelpDrawer from "./components/HelpDrawer";
import HelpContents from "./components/HelpContents";
import "antd/dist/antd.less";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [showDebug, setDebug] = useState(false);
  const [appState, setAppState] = useContext(AppContext);
  // const history = useHistory();
  const location = useLocation();

  const isAuthenticated = Boolean(appState.username);

  // Execute this once after the page is loaded
  // to get the username and establish a web socket
  useEffect(() => {
    async function onLoad() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        let { email } = user;

        // get email address from AWS login cognito user
        if (!email && user.attributes) {
          email = user.attributes.email;
        }
        // get email address from Google login cognito user
        if (!email) {
          email = user.getSignInUserSession().idToken.payload.email;
        }
        // don't update the state if we have the same user as before
        if (email !== appState.username) {
          setAppState({ ...appState, username: email });
        }
      } catch (e) {
        if (e !== "not authenticated") {
          message.error("Loading error:", e);
        }
      }

      setIsAuthenticating(false);
    }
    onLoad();
  }, [isAuthenticated, appState, appState.username, setAppState]);

  if (isAuthenticating) {
    return <p>Loading</p>;
  }

  const handleShowDebug = event => {
    event.preventDefault();
    setDebug(!showDebug);
  };

  const menuLocation = `/${location.pathname.split("/")[1]}`;

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu
          defaultSelectedKeys={["/"]}
          selectedKeys={[menuLocation]}
          className="nav-menu"
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item className="logo">
            <Link to="/">
              <img src={neuronbridgeLogo} alt="NeuronBridge" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="/help">
            <Link to="/help">Help</Link>
          </Menu.Item>
          {isAuthenticated && (
            <Menu.Item key="/mysearches">
              <Link to="/mysearches">Search</Link>
            </Menu.Item>
          )}
          {!isAuthenticated && [
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>,
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          ]}
        </Menu>
        <div className="janeliaLogo">
          <a
            className="projectLogo"
            href="https://www.janelia.org/project-team/flylight"
          >
            <img src={flylightLogo} alt="FlyLight Project" />
          </a>
          <a
            className="projectLogo"
            href="https://www.janelia.org/project-team/flyem"
          >
            <img src={flyemLogo} alt="FlyEM Project" />
          </a>
          <a href="https://janelia.org">
            <img src={janeliaLogo} alt="Janelia Research Campus" />
          </a>
        </div>
      </Header>
      <Content className="site-layout" style={{ marginTop: 86 }}>
        <div className="site-layout-background">
          <LoggedInAs username={appState.username} />
          <Routes
            appProps={{
              isAuthenticated
            }}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <p>
          HHMI ©2020 v{process.env.REACT_APP_VERSION}{" "}
          {showDebug && config.s3.BUCKET}{" "}
          <a onClick={handleShowDebug} href="/" className="debug">
            debug
          </a>
        </p>
      </Footer>
      <HelpDrawer>
        <HelpContents />
      </HelpDrawer>
    </Layout>
  );
}
