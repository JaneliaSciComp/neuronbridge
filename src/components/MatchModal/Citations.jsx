import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import MatchReferences from "../MatchReferences";

export default function Citations({ match, mask, matchRank, matchesTotal }) {
  return (
    <Row>
      <Col xs={24}>
        <h3>
          Match {matchRank} of {matchesTotal}
        </h3>
      </Col>
      <Col md={24} lg={12}>
        <h3>Mask:</h3>
        <ul>
          <li>
            <MatchReferences
              library={mask.libraryName}
              publishedName={mask.publishedName}
            />
          </li>
        </ul>
        <h3>Matching Image:</h3>
        <ul>
          <li>
            <MatchReferences
              library={match.image.libraryName}
              publishedName={match.image.publishedName}
            />
          </li>
        </ul>
      </Col>
      <Col xs={24}>
          <h3>Cite NeuronBridge</h3>
          <ul>
          <li>
            <a href="https://doi.org/10.1101/2022.07.20.500311">
              Clements et al., 2022
            </a>
          </li>
        </ul>
        <p>
          See also, the <Link to="/about">references section</Link> on our about
          page
        </p>
      </Col>
    </Row>
  );
}

Citations.propTypes = {
  match: PropTypes.object.isRequired,
  mask: PropTypes.object.isRequired,
  matchRank: PropTypes.number.isRequired,
  matchesTotal: PropTypes.number.isRequired,
};
