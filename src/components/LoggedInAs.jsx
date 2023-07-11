import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button } from "antd";
import { AppContext } from "../containers/AppContext";

import "./LoggedInAs.css";

export default function LoggedInAs(props) {
  const { username } = props;
  const { appState, setAppState } = useContext(AppContext);

  const history = useHistory();

  if (!username) {
    return null;
  }

  const  handleLogout = async () => {
    await Auth.signOut();
    // userHasAuthenticated(false);
    setAppState({ ...appState, username: null });
    history.push("/login");
  }

  return (
    <div>
      <span key="username" className="loggedInAs">
        Logged in as <Link to="/account">{username}</Link>{" "}
        <Button onClick={handleLogout} size="small">
          Logout
        </Button>
      </span>
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
