import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, message, Row, Col } from "antd";
import { Auth, Storage } from "aws-amplify";
import Confetti from "react-confetti";
import { TwitterOutlined } from "@ant-design/icons";
import { faEnvelope } from "@fortawesome/pro-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
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
import MaintenanceBanner from "./components/MaintenanceBanner";
import DebugPanel from "./components/DebugPanel";
import Announcements from "./components/Announcements";
import { useKonami } from "./libs/hooksLib";
import { dataVersionFile } from "./libs/utils";
import "./App.css";

const { Header, Content, Footer } = Layout;
const isInternalSite =
  process.env.REACT_APP_LEVEL && process.env.REACT_APP_LEVEL.match(/pre$/);

// Storage options used to load current.txt and config.json
const storageOptions = {
  customPrefix: {
    public: "",
  },
  level: "public",
  download: true,
  // This should force the s3 bucket to respond with the correct
  // cache control header to prevent aggressive caching of the
  // config.json file, so that the updated version on a release is
  // used as soon as possible.
  cacheControl: "no-cache",
};

export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const { appState, setState, setAppState, setPermanent } = useContext(
    AppContext
  );
  const [confetti, setConfetti] = useState(false);
  const [configLoadStatus, setConfigLoadStatus] = useState("pending");
  const location = useLocation();

  useKonami(() => {
    setPermanent({ debug: !appState.debug });
    setConfetti(true);
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
          message.error({ duration: 0, content: `Loading error: ${e}`, key: 'AppError', onClick: () => message.destroy('AppError') });
        }
      }

      setIsAuthenticating(false);
    }
    onLoad();
  }, [isAuthenticated, appState, appState.username, setAppState]);

  useEffect(() => {
    if (isAuthenticated && !appState.dataVersion) {
      // fetches the top level "current" or "next" text file.
      // grab the version number out of it and use that to grab the current
      // config.json file, which replaces paths.json.
      Auth.currentCredentials().then(() => {
        Storage.get(dataVersionFile(), storageOptions).then((result) => {
          const fr = new FileReader();
          fr.onload = (evt) => {
            const dataVersion = evt.target.result.trim();
            setState({ dataVersion });
          };
          fr.readAsText(result.Body);
        });
      });
    }
  }, [isAuthenticated, setState, appState.dataVersion]);

  useEffect(() => {
    if (configLoadStatus === "pending") {
      if (
        isAuthenticated &&
        appState.dataVersion &&
        !appState.dataConfig.loaded
      ) {
        setConfigLoadStatus("loading");
        Auth.currentCredentials().then(() => {
          Storage.get(
            `${appState.dataVersion}/config.json`,
            storageOptions
          ).then((result) => {
            const fr = new FileReader();
            fr.onload = (evt) => {
              const dataConfig = JSON.parse(evt.target.result);
              if (dataConfig !== appState.dataConfig) {
                setState({
                  dataConfig: {
                    ...appState.dataConfig,
                    ...dataConfig,
                    loaded: true,
                  },
                });
              }
            };
            fr.readAsText(result.Body);
            setConfigLoadStatus("loaded");
          });
        });
      }
    }
  }, [
    isAuthenticated,
    setState,
    appState.dataVersion,
    appState.dataConfig,
    configLoadStatus,
  ]);

  const menuLocation = `/${location.pathname.split("/")[1]}`;

  const menuItems = [
    // clasName: logo
    {key: "/", label: <Link to="/">Home</Link>},

    isAuthenticated ? {key: "/upload", label: <Link to="/upload">Upload</Link> } : null,

    {key: "/about", label: <Link to="/about">About</Link>},
    {key: "/help", label: <Link to="/help">Help</Link>},

    !isAuthenticated && !isInternalSite ? {key: "/signup", label: <Link to="/signup">Signup</Link> } : null,
    !isAuthenticated ? { key: "/login", label: <Link to="/login">Login</Link>} : null,
    appState.isAdmin ? { key: "/admin", label: <Link to="/admin">Admin</Link>} : null,
  ];


  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#000b0c',
    position: "fixed",
    zIndex: 50,
    width: "100%"
  };

  return (
    <Layout>
      {confetti && appState.debug ? (
        <Confetti
          style={{ zIndex: 200 }}
          numberOfPieces={500}
          colors={["#058d96", "#00a450", "#52b448", "#8ac341"]}
          recycle={false}
        />
      ) : (
        ""
      )}
      <Header style={headerStyle}>
        <div className="siteLogo">
          <Link to="/">
            <img src={neuronbridgeLogo} alt="NeuronBridge" />
          </Link>
        </div>
        <Menu
          defaultSelectedKeys={["/"]}
          selectedKeys={[menuLocation]}
          className="nav-menu"
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
          items={menuItems}
        />
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
          <Announcements source={config.announcements} />
          {config.UNDER_MAINTENANCE ? <MaintenanceBanner /> : ""}
          {isAuthenticating ? (
            <p>Loading...</p>
          ) : (
            <>
              <LoggedInAs username={appState.username} />
              <Routes
                appProps={{
                  isAuthenticated,
                  isAdmin: appState.isAdmin,
                }}
              />
            </>
          )}
        </div>
      </Content>
      <Footer className="siteFooter" style={{ position: "relative" }}>
        {appState.debug && <DebugPanel appState={appState} config={config} />}
        <Row>
          <Col span={8}>
            <ul>
              <li>
                <a href="https://twitter.com/NeuronBridge">
                  <TwitterOutlined /> Follow us
                </a>
              </li>
              <li>
                <a href="mailto:neuronbridge@janelia.hhmi.org">
                  <FontAwesomeIcon icon={faEnvelope} /> Email us
                </a>
              </li>
              <li>
                <Link to="/announcements">Announcements Archive</Link>
              </li>
            </ul>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <p>
              HHMI ©{new Date().getFullYear()}{" "}
              <Link to="/releasenotes/website">
                v{process.env.REACT_APP_VERSION}
              </Link>{" "}
            </p>
            <p>
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by/4.0/"
              >
                <img
                  alt="Creative Commons License"
                  style={{ borderWidth: 0 }}
                  src="https://i.creativecommons.org/l/by/4.0/88x31.png"
                />
              </a>
              <br />
              The data displayed here are licensed under a {" "}
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by/4.0/"
              >
                Creative Commons Attribution 4.0 International License
              </a>
              .
            </p>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <ul>
              <li>
                <a href="https://www.hhmi.org/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="https://github.com/JaneliaSciComp/neuronbridge">
                  <FontAwesomeIcon icon={faGithub} /> Github
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Footer>
      <HelpDrawer>
        <HelpContents />
      </HelpDrawer>
    </Layout>
  );
}
