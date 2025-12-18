// Landing.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Col, Row } from "antd";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "./SearchInput";
import { isInternalSite } from "../libs/utils";
import "./Landing.css";

const { Title, Paragraph } = Typography;


function Landing(props) {
  const { isAuthenticated } = props;

  const loginText = isInternalSite() ? (
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
          {isInternalSite()
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
              <a href="https://www.janelia.org/project-team/flylight" target="_blank" rel="noopener noreferrer">
                FlyLight <FontAwesomeIcon icon={faExternalLink} size="xs" />
              </a>{" "}
              and <a href="https://www.janelia.org/project-team/flyem" target="_blank" rel="noopener noreferrer">FlyEM <FontAwesomeIcon icon={faExternalLink} size="xs" /></a>{" "}
              projects at{" "}
              <a href="https://www.janelia.org" target="_blank" rel="noopener noreferrer">Janelia Research Campus <FontAwesomeIcon icon={faExternalLink} size="xs" /></a>, as well
              as other public connectomic data sets.
              You can find similar neurons based on shape regardless of data set.
            </Paragraph>

            {!isAuthenticated && (
              <Paragraph>
                Please login above if you already know your neuron ID or driver
                line name, or start by browsing the included data collections:
              </Paragraph>
            )}
            {isAuthenticated && (
              <Paragraph>
                Begin your search above if you already know your neuron ID or
                driver line name, or start by browsing the included <Link to="/collections">data collections</Link>:
              </Paragraph>
            )}

            <Row className="collections">
              <Col span={12}>
                <b>Light Microscopy</b><br/>
                <a href="http://gen1mcfo.janelia.org/cgi-bin/gen1mcfo.cgi" target="_blank" rel="noopener noreferrer">FlyLight Generation 1 MCFO <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
                <a href="http://splitgal4.janelia.org" target="_blank" rel="noopener noreferrer">FlyLight Split-GAL4 <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
                <a href="https://flylight-raw.janelia.org/cgi-bin/raw.cgi" target="_blank" rel="noopener noreferrer">FlyLight Split-GAL4 Omnibus Broad <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
              </Col>
              <Col span={12}>
                <b>Electron Microscopy</b><br/>
                <a href="https://neuprint.janelia.org/?dataset=male-cns:v0.9&qt=findneurons" target="_blank" rel="noopener noreferrer"> FlyEM Male CNS <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
                <a href="https://neuprint.janelia.org/?dataset=hemibrain%3Av1.2.1&qt=findneurons" target="_blank" rel="noopener noreferrer">FlyEM Hemibrain <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
                <a href="https://neuprint.janelia.org/?dataset=manc%3Av1.0&qt=findneurons" target="_blank" rel="noopener noreferrer">FlyEM MANC <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
                <a href="https://codex.flywire.ai" target="_blank" rel="noopener noreferrer">FlyWire Brain <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
              </Col>
            </Row>

            <Paragraph>
              We offer instant results with Color Depth MIP and PatchPerPixMatch
              search algorithms across image collections. You can also
              upload your own image to run a custom Color Depth MIP search (see About
              page). For NBLAST searching, try{" "}
              <a href="https://www.virtualflybrain.org" target="_blank" rel="noopener noreferrer">Virtual Fly Brain <FontAwesomeIcon icon={faExternalLink} size="xs" /></a>.
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
