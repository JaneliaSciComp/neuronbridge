import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import config from "./config";
import App from "./App";
import { AppProvider } from "./containers/AppContext";
import { FilterProvider } from "./containers/FilterContext";
import * as serviceWorker from "./serviceWorker";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: "20px",
  // you can also just use 'scale'
  transition: transitions.FADE
};
/* eslint-disable react/jsx-props-no-spreading */
ReactDOM.render(
  <Router>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <AppProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </AppProvider>
    </AlertProvider>
  </Router>,
  document.getElementById("root")
);
/* eslint-enable react/jsx-props-no-spreading */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
