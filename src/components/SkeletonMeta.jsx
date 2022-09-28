import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import LibraryFormatter from "./LibraryFormatter";
import ExternalLink from "./ExternalLink";

export default function SkeletonMeta({ attributes, compact, fromSearch }) {
  if (!attributes.image) {
    return <span style={{ color: "red" }}>attribute.image missing</span>;
  }

  const {
    publishedName,
    libraryName,
    neuronType,
    neuronInstance,
    gender,
  } = attributes.image;

  // TODO: this link is wrong when showing a pppm result.
  const searchUrl = fromSearch ? `/search?q=${publishedName.split(':').slice(-1)}`  : `/matches/cdm/em/${attributes.image.id}`;

  const neuronTypeAndInstance = `${neuronType || "-"} / ${neuronInstance || "-"}`;

  if (compact) {
    return (
      <p>
        <b>Body Id:</b>
        <Link to={searchUrl}>{publishedName}</Link>
      </p>
    );
  }

  return (
    <Row>
      <Col xs={24} lg={12}>
        <p>
          <b>Body Id:</b>
          <br />
          <Link to={searchUrl}>{publishedName}</Link>
        </p>
        {attributes.normalizedScore ? (
          <p>
            <b>Score:</b>
            <br /> {Math.round(attributes.normalizedScore)}
          </p>
        ) : (
          ""
        )}
        {attributes.matchingPixels ? (
          <p>
            <b>Matched Pixels:</b>
            <br /> {Math.round(attributes.matchingPixels)}
          </p>
        ) : (
          ""
        )}
        {attributes.pppmScore ? (
          <p>
            <b>Score:</b>
            <br /> {Math.round(attributes.pppmScore)}
          </p>
        ) : (
          ""
        )}
        {attributes.pppmRank ? (
          <p>
            <b>Rank:</b>
            <br /> {Math.round(attributes.pppmRank)}
          </p>
        ) : (
          ""
        )}
        <p>
          <b>Neuron Type / Instance: </b>
          <br /> {neuronTypeAndInstance}
        </p>
        <p>
          <b>Library: </b>
          <br />
          <LibraryFormatter type={libraryName} />
        </p>
      </Col>
      <Col xs={24} lg={12}>
        <p>
          <b>Gender:</b>
          <br /> {gender === "f" ? "Female" : "Male"}
        </p>
        <p>
          <b>Links:</b>
          <br />
          <ExternalLink id={publishedName} isLM={false} library={libraryName} />
          <br />
          <Link to={searchUrl}>View Precomputed Matches</Link>
        </p>
      </Col>
    </Row>
  );
}

SkeletonMeta.propTypes = {
  attributes: PropTypes.shape({
    image: PropTypes.shape({
      id: PropTypes.string,
      libraryName: PropTypes.string,
      publishedName: PropTypes.string,
      alignmentSpace: PropTypes.string,
      gender: PropTypes.oneOf(["m", "f"]),
      neuronType: PropTypes.string,
      neuronInstance: PropTypes.string,
    }),
    normalizedScore: PropTypes.number,
    matchingPixels: PropTypes.number,
    pppmScore: PropTypes.string,
    pppmRank: PropTypes.string,
  }).isRequired,
  compact: PropTypes.bool,
  fromSearch: PropTypes.bool
};

SkeletonMeta.defaultProps = {
  compact: false,
  fromSearch: false
};
