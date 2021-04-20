import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export default function Admin() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getSession() {
      const session = await Auth.currentSession();
      setToken(session.accessToken.jwtToken);
    }
    getSession();
  }, []);

  return (
    <>
      <h2>Admin Page</h2>
      <p>Bearer token:</p>
      <textarea
        readOnly
        style={{ width: "100%", height: "15em" }}
        value={token}
      />
    </>
  );
}
