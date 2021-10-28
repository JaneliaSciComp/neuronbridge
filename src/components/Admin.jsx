import React, { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { Switch } from "antd";
import { AppContext } from "../containers/AppContext";
import AnnouncementsCreate from "./AnnouncementsCreate";

export default function Admin() {
  const [token, setToken] = useState("");
  const [identityId, setIdentity] = useState();
  const [appState, , setPermanent] = useContext(AppContext);

  useEffect(() => {
    async function getSession() {
      const session = await Auth.currentSession();
      setToken(session.accessToken.jwtToken);
    }
    getSession();
  }, []);

  useEffect(() => {
    async function getCreds() {
      const creds = await Auth.currentCredentials();
      setIdentity(creds.identityId);
    }
    getCreds();
  }, []);

  const handleShowDebug = () => {
    setPermanent({ debug: !appState.debug });
  };

  return (
    <>
      <h2>Admin Page</h2>
      <p>Bearer token:</p>
      <textarea
        readOnly
        style={{ width: "100%", height: "15em" }}
        value={token}
      />
      <p>
        <b>Identity Id:</b> {identityId}
      </p>
      <Switch
        style={{ marginBottom: "1em" }}
        checked={appState.debug}
        onChange={handleShowDebug}
        checkedChildren="debug enabled"
        unCheckedChildren="debug disabled"
        defaultChecked
      />{" "}
      {appState.isAdmin ? <AnnouncementsCreate /> : null}
    </>
  );
}
