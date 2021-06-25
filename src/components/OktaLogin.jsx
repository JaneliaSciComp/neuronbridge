import React from "react";
import { Auth } from "aws-amplify";
import { Button } from "antd";

export default function OktaLogin() {

  function signIn() {
    Auth.federatedSignIn({ provider: "OKTA"});
  }

  return (
    <div>
      <Button block type="primary" onClick={() => signIn()}>Login with Okta</Button>
    </div>
  );
}
