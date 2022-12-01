// Landing.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Col, Row } from "antd";
import SearchInput from "./SearchInput";
import "./Landing.css";

const { Title, Paragraph } = Typography;

const isInternalSite =
  process.env.REACT_APP_LEVEL && process.env.REACT_APP_LEVEL.match(/pre$/);

function Landing(props) {
  const { isAuthenticated } = props;

  const loginText = isInternalSite ? (
    <>
      Please <Link to="/login">login with Okta</Link> to start searching.
    </>
  ) : (
    <>
      Please <Link to="/login">login</Link> or <Link to="signup">sign up</Link>{" "}
      to start searching.
    </>
  );

  return (
    <>
      {isAuthenticated && <SearchInput />}
      <div className="landing">
        <Title>
          {isInternalSite
            ? "NeuronBridge (pre-release)"
            : "Welcome to NeuronBridge"}
        </Title>
        <Row>
          <Col md={12} className="copy">
            {!isAuthenticated && <Paragraph strong>{loginText}</Paragraph>}
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
                <a href="http://gen1mcfo.janelia.org/cgi-bin/gen1mcfo.cgi">
                  FlyLight Generation 1 MCFO
                </a>
              </Col>
              <Col span={12}>
                <a href="http://splitgal4.janelia.org">FlyLight Split-GAL4</a>
              </Col>
              <Col span={12}>
                <a href="https://neuprint.janelia.org/">FlyEM Hemibrain</a>
              </Col>
              <Col span={12}>
                <a href="https://neuprint.janelia.org/">FlyEM VNC</a>
              </Col>
            </Row>

            <Paragraph>
              We offer instant results with Color Depth MIP and PatchPerPixMatch
              search algorithms across Janelia image collections. Or you can
              upload your own data for a live Color Depth MIP search (see About
              page). For NBLAST searching, try{" "}
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
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Landing;
