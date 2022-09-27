import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import LibraryFormatter from "./LibraryFormatter";
import ExternalLink from "./ExternalLink";

export default function LineMeta({ attributes, compact }) {
  if (!attributes.image) {
    return <span style={{ color: "red" }}>attribute.image missing</span>;
  }

  const {
    publishedName,
    libraryName,
    slideCode,
    objective,
    gender,
    anatomicalArea,
    channel,
    mountingProtocol,
    alignmentSpace,
  } = attributes.image;
  const searchUrl = `/matches/cdm/lm/${attributes.image.id}`;

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
        {attributes.pppmRank !== undefined ? (
          <p>
            <b>Rank:</b> {Math.round(attributes.pppmRank)}
          </p>
        ) : (
          ""
        )}
        {attributes.pppmScore !== undefined ? (
          <p>
            <b>Score:</b> {Math.round(attributes.pppmScore)}
          </p>
        ) : (
          ""
        )}
        <p>
          <b>Slide Code:</b> {slideCode}
        </p>
        {channel ? (
          <p>
            <b>Channel:</b> {channel}
          </p>
        ) : (
          ""
        )}
        <p>
          <b>Library: </b>
          <LibraryFormatter type={libraryName} />
        </p>
        <p>
          <b>Gender:</b> {gender === "f" ? "Female" : "Male"}
        </p>
      </Col>
      <Col md={24} lg={12}>
        <p>
          <b>Anatomical Area:</b> {anatomicalArea}
        </p>
        <p>
          <b>Mounting Protocol:</b> {mountingProtocol}
        </p>
        <p>
          <b>Alignment Space:</b> {alignmentSpace}
        </p>
        <p>
          <b>Magnification:</b> {objective}
        </p>
        <p>
          <b>Links:</b> <br />
          <ExternalLink
            id={slideCode}
            publishedName={publishedName}
            isLM
            library={libraryName}
          />
          <br />
          <Link to={searchUrl}>View Precomputed Matches</Link>
        </p>
      </Col>
    </Row>
  );
}

LineMeta.propTypes = {
  attributes: PropTypes.shape({
    image: PropTypes.shape({
      id: PropTypes.string,
      libraryName: PropTypes.string,
      publishedName: PropTypes.string,
      alignmentSpace: PropTypes.string,
      gender: PropTypes.oneOf(["m", "f"]),
      slideCode: PropTypes.string,
      objective: PropTypes.string,
      anatomicalArea: PropTypes.string,
      channel: PropTypes.number,
      mountingProtocol: PropTypes.string,
    }),
    normalizedScore: PropTypes.number,
    matchingPixels: PropTypes.number,
    pppmScore: PropTypes.number,
    pppmRank: PropTypes.number,
  }).isRequired,
  compact: PropTypes.bool,
};

LineMeta.defaultProps = {
  compact: false,
};
