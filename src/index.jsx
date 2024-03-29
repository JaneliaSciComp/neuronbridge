import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { CookiesProvider } from 'react-cookie';
import { ConfigProvider } from 'antd';

import config from "./config";
import App from "./App";
import { AppProvider } from "./containers/AppContext";
// import * as serviceWorker from "./serviceWorker";


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    // 👇 https://github.com/aws-amplify/amplify-js/issues/2634
    authenticationFlowType: "USER_PASSWORD_AUTH",
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
      domain: config.oauth.DOMAIN,
      scope: config.oauth.SCOPE,
      redirectSignIn: config.oauth.REDIRECT_SIGN_IN,
      redirectSignOut: config.oauth.REDIRECT_SIGN_OUT,
      responseType: "code"
    },
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: config.api.endpoints || []
  },
  "aws_appsync_graphqlEndpoint": config.appsync.graphqlEndpoint,
  "aws_appsync_region": config.appsync.region,
  "aws_appsync_authenticationType": config.appsync.authenticationType,
  "aws_appsync_apiKey": config.appsync.apiKey
});

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { worker } = require('./mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <AppProvider>
      <CookiesProvider>
        <ConfigProvider theme={{ token: { colorPrimary: '#008b94', colorLink: '#008b94', colorPrimaryTextHover: "#008b94", colorPrimaryHover: "#008b94", colorLinkHover: "#ff746b"   } }}>
          <App />
        </ConfigProvider>
      </CookiesProvider>
    </AppProvider>
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
