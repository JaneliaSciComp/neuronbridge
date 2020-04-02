import React from "react";
import PropTypes from "prop-types";

export default function LoggedInAs(props) {
  const { username } = props;

  if (!username) {
    return null;
  }

  return (
    <p key="username" className="login">
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
