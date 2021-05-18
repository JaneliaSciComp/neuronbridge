import React, { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { AppContext } from "../containers/AppContext";

export default function Admin() {
  const [token, setToken] = useState("");
  const [appState, , setPermanent] = useContext(AppContext);

  useEffect(() => {
    async function getSession() {
      const session = await Auth.currentSession();
      setToken(session.accessToken.jwtToken);
    }
    getSession();
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
      <Switch
        checked={appState.debug}
        onChange={handleShowDebug}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />{" "}
      debug enabled
    </>
  );
}
