// Landing.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import SearchInput from "./SearchInput";

const { Title, Paragraph } = Typography;

function Landing(props) {
  const { isAuthenticated } = props;
  return (
    <>
      {isAuthenticated && <SearchInput />}
      <Title>Welcome to NeuronBridge</Title>
      {!isAuthenticated && (
        <Paragraph strong>
          Please <Link to="/login">login</Link> or{" "}
          <Link to="signup">sign up</Link> to start searching.
        </Paragraph>
      )}
      <Paragraph>Content Place holder about the site.</Paragraph>
    </>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Landing;
