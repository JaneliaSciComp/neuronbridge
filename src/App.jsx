import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import { Auth, Storage } from "aws-amplify";
import { faEnvelope } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Routes from "./Routes";
import LoggedInAs from "./components/LoggedInAs";
import config from "./config";
import janeliaLogo from "./janelia_logo.png";
import flyemLogo from "./flyemLogo.png";
import flylightLogo from "./flylightlogo.png";
import neuronbridgeLogo from "./neuronbridge_logo.png";
import { AppContext } from "./containers/AppContext";
import HelpDrawer from "./components/Help/HelpDrawer";
import HelpContents from "./components/Help/HelpContents";
import SiteSurvey from "./components/SiteSurvey";
import MaintenanceBanner from "./components/MaintenanceBanner";
import { useKonami } from "./libs/hooksLib";
import "antd/dist/antd.less";
import "./App.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [appState, setAppState, setPermanent] = useContext(AppContext);
  const location = useLocation();

  useKonami(() => {
    setPermanent({ debug: !appState.debug });
  });

  const isAuthenticated = Boolean(appState.username);

  // Execute this once after the page is loaded
  // to get the username and establish a web socket
  useEffect(() => {
    async function onLoad() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        let { email } = user;

        const userSession = user.getSignInUserSession();

        // get email address from AWS login cognito user
        if (!email && user.attributes) {
          email = user.attributes.email;
        }
        // get email address from Google login cognito user
        if (!email) {
          email = userSession.idToken.payload.email;
        }

        // get cognito groups information and see if the user is an admin.
        let isAdmin = false;
        const groups = userSession.accessToken.payload["cognito:groups"];
        if (groups) {
          if (groups.includes("neuronbridge-admins")) {
            isAdmin = true;
          }
        }

        // don't update the state if we have the same user as before
        if (email !== appState.username) {
          setAppState({ ...appState, username: email, isAdmin });
        }
      } catch (e) {
        if (!/not authenticated/.test(e)) {
          message.error("Loading error:", e);
        }
      }

      setIsAuthenticating(false);
    }
    onLoad();
  }, [isAuthenticated, appState, appState.username, setAppState]);

  useEffect(() => {
    const storageOptions = {
      customPrefix: {
        public: ""
      },
      level: "public",
      download: true,
      // This should force the s3 bucket to respond with the correct
      // cache control header to prevent aggressive caching of the
      // paths.json file, so that the updated version on a release is
      // used as soon as possible.
      cacheControl: "no-cache"
    };

    if (isAuthenticated) {
      Auth.currentCredentials().then(() => {
        Storage.get("paths.json", storageOptions).then(result => {
          const fr = new FileReader();
          fr.onload = evt => {
            const paths = JSON.parse(evt.target.result);
            if (paths !== appState.paths) {
              setAppState({ ...appState, paths });
            }
          };
          fr.readAsText(result.Body);
        });
      });
    }
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  /*  if (isAuthenticating) {
    return <p>Loading</p>;
  } */

  const searchEnpoints = config.api.endpoints.map(endpoint => (
    <p key={endpoint.name}>
      {endpoint.name} - {endpoint.endpoint}
    </p>
  ));

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
          {isAuthenticated && (
            <Menu.Item key="/upload">
              <Link to="/upload">Upload</Link>
            </Menu.Item>
          )}
          <Menu.Item key="/about">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="/help">
            <Link to="/help">Help</Link>
          </Menu.Item>
          {!isAuthenticated && [
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>,
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          ]}
          {appState.isAdmin && (
            <Menu.Item key="/admin">
              <Link to="/admin">Admin</Link>
            </Menu.Item>
          )}
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
          {config.UNDER_MAINTENANCE ? <MaintenanceBanner /> : ""}
          {isAuthenticating ? (
            <p>Loading...</p>
          ) : (
            <>
              <SiteSurvey />
              <LoggedInAs username={appState.username} />
              <Routes
                appProps={{
                  isAuthenticated,
                  isAdmin: appState.isAdmin
                }}
              />
            </>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", position: "relative" }}>
        {appState.debug && (
          <>
            <p>Data Bucket: {config.s3.BUCKET}</p>
            <p>Search Bucket: {config.SEARCH_BUCKET}</p>
            <p>CDM Bucket: {config.CDM_BUCKET}</p>
            <p>PPPM Bucket: {config.PPPM_BUCKET}</p>
            {searchEnpoints}
            <p>GraphQL: {config.appsync.graphqlEndpoint}</p>
            <p>App Level: {config.APP_LEVEL}</p>
          </>
        )}
        <p>
          HHMI ©{new Date().getFullYear()}{" "}
          <Link to="/releasenotes/website">
            v{process.env.REACT_APP_VERSION}
          </Link>{" "}
        </p>
        <p>
          <a href="mailto:neuronbridge@janelia.hhmi.org">
            <FontAwesomeIcon icon={faEnvelope} /> Contact Us
          </a>{" "}
          | <a href="https://www.hhmi.org/privacy-policy">Privacy Policy</a>
        </p>

        <p>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img
              alt="Creative Commons License"
              style={{ borderWidth: 0 }}
              src="https://i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </a>
          <br />
          This work is licensed under a{" "}
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            Creative Commons Attribution 4.0 International License
          </a>
          .
        </p>
      </Footer>
      <HelpDrawer>
        <HelpContents />
      </HelpDrawer>
    </Layout>
  );
}
