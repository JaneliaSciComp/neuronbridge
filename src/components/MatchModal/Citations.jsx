import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import MatchReferences from "../MatchReferences";
import LibraryFormatter from "../LibraryFormatter";

export default function Citations({ match, mask, matchRank, matchesTotal }) {
  const inputBlock = mask.identityId ? "" : (
    <>
      <h3>
        Input Image ({mask.publishedName} - <LibraryFormatter type={mask.libraryName} />):
      </h3>
      <MatchReferences
        library={mask.libraryName}
        publishedName={mask.publishedName}
      />
    </>
  );

  return (
    <Row>
      <Col xs={24}>
        <h3>
          Match {matchRank} of {matchesTotal}
        </h3>
      </Col>
      <Col xs={24}>
        {inputBlock}
        <h3>
          Matching Image ({match.image.publishedName} -{" "}
          <LibraryFormatter type={match.image.libraryName}/>):
        </h3>
        <MatchReferences
          library={match.image.libraryName}
          publishedName={match.image.publishedName}
        />
      </Col>
      <Col xs={24}>
        <h3>Cite NeuronBridge</h3>
        <ul>
          <li>
            <a href="https://doi.org/10.1186/s12859-024-05732-7" target="_blank" rel="noopener noreferrer">
              Clements et al., 2024
            </a>
          </li>
        </ul>
        <p>
          For more information, see the <Link to="/about">References section</Link> on the About page.
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
