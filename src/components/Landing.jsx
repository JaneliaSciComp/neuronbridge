// Landing.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import SearchInput from "./SearchInput";
import "./Landing.css";

const { Title, Paragraph } = Typography;

function Landing(props) {
  const { isAuthenticated } = props;
  return (
    <>
      {isAuthenticated && <SearchInput />}
      <div className="landing">
        <Title>Welcome to NeuronBridge</Title>
        {!isAuthenticated && (
          <Paragraph strong>
            Please <Link to="/login">login</Link> or{" "}
            <Link to="signup">sign up</Link> to start searching.
          </Paragraph>
        )}
        <Paragraph>Content Place holder about the site.</Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum
          nisi quis eleifend quam adipiscing vitae proin. At auctor urna nunc id
          cursus metus. Sollicitudin ac orci phasellus egestas tellus rutrum
          tincidunt lobortis. Id diam vel quam elementum pulvinar etiam non
          quam. Turpis egestas integer eget aliquet. Felis eget velit aliquet
          euismod lacinia. Eget mi proin sed libero enim sed faucibus turpis.
          Morbi tempus iaculis urna id volutpat.
        </Paragraph>

        <Paragraph>
          Amet volutpat consequat mauris nunc congue. Nisl nisi scelerisque eu
          ultrices vitae auctor eu augue. Augue neque gravida in fermentum et
          sollicitudin ac orci phasellus. Sed lectus vestibulum mattis
          ullamcorper velit sed ullamcorper. Purus gravida quis blandit turpis.
          volutpat consequat mauris nunc congue nisi vitae.
        </Paragraph>
      </div>
    </>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Landing;
