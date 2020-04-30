import React from "react";
import PropTypes from "prop-types";
import "./LoggedInAs.css";

export default function LoggedInAs(props) {
  const { username } = props;

  if (!username) {
    return null;
  }

  return (
    <p key="username" className="loggedInAs">
      Logged in as {username}
    </p>
  );
}

LoggedInAs.propTypes = {
  username: PropTypes.string
};

LoggedInAs.defaultProps = {
  username: null
};
