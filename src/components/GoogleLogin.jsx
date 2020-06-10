import React from "react";
import { Auth } from "aws-amplify";
import { Button } from "antd";

export default function GoogleLogin() {

  function signIn() {
    Auth.federatedSignIn({ provider: "Google"});
  }

  return (
    <div>
      <Button block type="primary" onClick={() => signIn()}>Login with Google</Button>
    </div>
  );
}
