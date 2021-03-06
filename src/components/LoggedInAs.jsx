import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button } from "antd";
import { AppContext } from "../containers/AppContext";

import "./LoggedInAs.css";

export default function LoggedInAs(props) {
  const { username } = props;
  const [appState, setAppState] = useContext(AppContext);

  const history = useHistory();

  if (!username) {
    return null;
  }

  async function handleLogout() {
    await Auth.signOut();
    // userHasAuthenticated(false);
    setAppState({ ...appState, username: null });
    history.push("/login");
  }

  return (
    <div>
      <p key="username" className="loggedInAs">
        Logged in as {username}{" "}
        <Button onClick={handleLogout} size="small">
          Logout
        </Button>
      </p>
      <br style={{ clear: "all" }} />
    </div>
  );
}

LoggedInAs.propTypes = {
  username: PropTypes.string
};

LoggedInAs.defaultProps = {
  username: null
};
