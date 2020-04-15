import React from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import { Button, message } from "antd";

export default function GoogleLogin(props) {
  const { userHasAuthenticated} = props;

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
    // gapi is initialized in the index.html
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

