// Landing.jsx
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import SearchInput from "./SearchInput";
import "antd/dist/antd.css";

function Landing(props) {
  const { isAuthenticated } = props;
  return (
    <>
      {isAuthenticated && <SearchInput />}
      <h1>Welcome to NeuronBridge</h1>
    {!isAuthenticated && <p>Please <Link to="/login">login</Link> or <Link to="signup">sign up</Link> to start searching.</p>}
    </>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Landing;
