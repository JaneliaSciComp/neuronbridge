// Landing.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Col, Row } from "antd";
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
        <Row>
          <Col md={12} className="copy">
            {!isAuthenticated && (
              <Paragraph strong>
                Please <Link to="/login">login</Link> or{" "}
                <Link to="signup">sign up</Link> to start searching.
              </Paragraph>
            )}
            <Paragraph>Find your neuron fast!</Paragraph>

            <Paragraph>
              Search light and electron microscopy data sets of the Drosophila
              nervous system provided by the{" "}
              <a href="https://www.janelia.org/project-team/flylight">
                FlyLight
              </a>{" "}
              and <a href="https://www.janelia.org/project-team/flyem">FlyEM</a>{" "}
              projects at{" "}
              <a href="https://www.janelia.org">Janelia Research Campus</a>. You
              can find similar neurons based on shape regardless of data set.
            </Paragraph>

            {!isAuthenticated && (
              <Paragraph>
                Please login above if you already know your EM body ID or GAL4
                line name, or browse our image collections at:
              </Paragraph>
            )}
            {isAuthenticated && (
              <Paragraph>
                Start your search above if you already know your EM body ID or
                GAL4 line name, or browse our image collections at:
              </Paragraph>
            )}

            <Row className="collections">
              <Col span={12}>
                <a href="https://neuprint.janelia.org/">FlyEM Hemibrain</a>
              </Col>
              <Col span={12}>
                <a href="http://splitgal4.janelia.org">FlyLight Split-GAL4</a>
              </Col>
              <Col span={12}>
                <p>FlyLight Generation 1 MCFO (coming soon)</p>
              </Col>
              <Col span={12}>
                <p>FlyLight Generation 1 GAL4 screen (coming soon)</p>
              </Col>
            </Row>

            <Paragraph>
              We offer fast color depth mask searching, with no segmentation
              needed (see About page). For NBLAST searching, try{" "}
              <a href="https://www.virtualflybrain.org">Virtual Fly Brain</a>.
            </Paragraph>

            <Paragraph>
              <Link to="/about">Learn more…</Link>
            </Paragraph>
          </Col>
        </Row>
      </div>
    </>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Landing;
