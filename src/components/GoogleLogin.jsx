import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import { Button, message } from "antd";

function initGapi() {
  // init the Google SDK client
  const g = window.gapi;
  g.load("auth2", () => {
    g.auth2
      .init({
        client_id:
          "571848494296-aaese10flk849dtroc9mug08vr8fqiko.apps.googleusercontent.com",
        fetch_basic_profile: true,
        ux_mode: "pop-up"
      })
  });
}

function createScript() {
  // load the Google SDK
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/platform.js";
  script.async = true;
  script.onload = initGapi;
  document.body.appendChild(script);
}

export default function GoogleLogin(props) {
  const { userHasAuthenticated} = props;
  useEffect(() => {
    const ga =
      window.gapi && window.gapi.auth2
        ? window.gapi.auth2.getAuthInstance()
        : null;
    if (!ga) createScript();
  }, []);

  async function getAWSCredentials(googleUser) {
    const {
      id_token: idToken,
      expires_at: expiresAt
    } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    const user = {
      email: profile.getEmail(),
      name: profile.getName()
    };
    await Auth.federatedSignIn(
      "google",
      { token: idToken, expires_at: expiresAt },
      user
    );
    userHasAuthenticated(true);
  }

  function signIn() {
    const ga = window.gapi.auth2.getAuthInstance();
    const result = ga.signIn();
    result.then(
      googleUser => {
        getAWSCredentials(googleUser);
      },
      error => {
        message.error("Google Login Error: ", error);
      }
    );
  }

  return (
    <div>
      <Button block type="primary" onClick={() => signIn()}>Login with Google</Button>
    </div>
  );
}

GoogleLogin.propTypes = {
  userHasAuthenticated: PropTypes.func.isRequired
};

