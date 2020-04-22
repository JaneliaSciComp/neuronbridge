import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import LoggedInAs from "./components/LoggedInAs";
import "./App.css";
import janeliaLogo from "./janelia_logo.png";
import flyemLogo from "./flyemLogo.png";
import flylightLogo from "./flylightlogo.png";
import { AppContext } from "./containers/AppContext";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [appState, setAppState] = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();

  // Execute this once after the page is loaded
  // to get the username and establish a web socket
  useEffect(() => {
    async function onLoad() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const email = user.email || user.attributes.email;
        if (email === appState.username) {
          return;
        }
        setAppState({ ...appState, username: email });
        userHasAuthenticated(true);
      } catch (e) {
        if (e !== "not authenticated") {
          message.error("Loading error:", e.message);
        }
      }

      setIsAuthenticating(false);
    }
    onLoad();
  }, [isAuthenticated, appState, appState.username, setAppState]);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    setAppState({ ...appState, username: null });
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
          {isAuthenticated && (
            <Menu.Item key="/search">
              <Link to="/search">Search</Link>
            </Menu.Item>
          )}
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
          <Menu.Item key="/about">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{marginTop: 86 }}
      >
        <div className="site-layout-background">
          <LoggedInAs username={appState.username} />
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
