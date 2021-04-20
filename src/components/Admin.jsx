import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export default function Admin() {
  const [token, setToken] = useState(null);

  useEffect(async () => {
    const session = await Auth.currentSession();
    setToken(session.accessToken.jwtToken);
  }, []);

  return (
    <>
      <h2>Admin Page</h2>
      <p>Bearer token:</p>
      <textarea style={{ width: "100%", height: "15em" }} value={token} />
    </>
  );
}
