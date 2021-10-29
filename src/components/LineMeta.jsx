import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import LibraryFormatter from "./LibraryFormatter";
import ExternalLink from "./ExternalLink";

export default function LineMeta({ attributes, compact }) {
  const { publishedName, libraryName } = attributes;
  const searchUrl = `/search?q=${publishedName}`;

  if (compact) {
    return (
      <p>
        <b>Line Name: </b>
        <Link to={searchUrl}>{publishedName}</Link>
      </p>
    );
  }

  return (
    <Row>
      <Col md={24} lg={12}>
        <p>
          <b>Line Name: </b>
          <Link to={searchUrl}>{publishedName}</Link>
        </p>
        {attributes.normalizedScore ? (
          <p>
            <b>Score:</b> {Math.round(attributes.normalizedScore)}
          </p>
        ) : (
          ""
        )}
        {attributes.matchingPixels ? (
          <p>
            <b>Matched Pixels:</b> {Math.round(attributes.matchingPixels)}
          </p>
        ) : (
          ""
        )}
        {attributes.pppRank !== undefined ? (
          <p>
            <b>Rank:</b> {Math.round(attributes.pppRank)}
          </p>
        ) : (
          ""
        )}
        {attributes.pppScore !== undefined ? (
          <p>
            <b>Score:</b> {Math.round(attributes.pppScore)}
          </p>
        ) : (
          ""
        )}
        <p>
          <b>Slide Code:</b> {attributes.slideCode}
        </p>
        <p>
          <b>Channel:</b> {attributes.channel}
        </p>
        <p>
          <b>Library: </b>
          <LibraryFormatter type={libraryName} />
        </p>
        <p>
          <b>Gender:</b> {attributes.gender === "f" ? "Female" : "Male"}
        </p>
      </Col>
      <Col md={24} lg={12}>
        <p>
          <b>Anatomical Area:</b> {attributes.anatomicalArea}
        </p>
        <p>
          <b>Mounting Protocol:</b> {attributes.mountingProtocol}
        </p>
        <p>
          <b>Alignment Space:</b> {attributes.alignmentSpace}
        </p>
        <p>
          <b>Magnification:</b> {attributes.objective}
        </p>
        <p>
          <b>Links:</b> <br />
          <ExternalLink
            publishedName={publishedName}
            isLM
            library={libraryName}
          />
          <br />
          <Link to={searchUrl}>View Precomputed Search</Link>
        </p>
      </Col>
    </Row>
  );
}

LineMeta.propTypes = {
  attributes: PropTypes.object.isRequired,
  compact: PropTypes.bool
};

LineMeta.defaultProps = {
  compact: false
};
