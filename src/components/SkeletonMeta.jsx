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

  const matchUrls = [];

  if (attributes?.image?.files?.PPPMResults) {
    const matchId = attributes?.image?.files?.PPPMResults;
    if ( matchId ) {
      const matchUrl = `/matches/pppm/${matchId.replace(/\.json$/,'')}`;
      matchUrls.push({ type: "PPPM", url: matchUrl});
    }
  }
  if (attributes?.image?.files?.CDSResults) {
    const matchId = attributes?.image?.files?.CDSResults;
    if ( matchId ) {
      const matchUrl = `/matches/cdm/${matchId.replace(/\.json$/,'')}`;
      matchUrls.push({ type: "CDM", url:  matchUrl});
    }
  }

  const precomputedLinks = matchUrls.map((match) => (
      <React.Fragment key={match.url}>
        <Link key={match.url} to={match.url}>
          View Precomputed {match.type} Matches
        </Link>
        <br />
      </React.Fragment>
    ));


  const neuronTypeAndInstance = `${neuronType || "-"} / ${neuronInstance || "-"}`;

  if (compact) {
    return (
      <p>
        <b>Body Id:</b>
        <span>{publishedName}</span>
      </p>
    );
  }

  return (
    <Row>
      <Col xs={24} md={15}>
        <p>
          <b>Body Id:</b>
          <br />
          <span>{publishedName}</span>
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
        {attributes.pppmScore ? (
          <p>
            <b>Score:</b> {Math.round(attributes.pppmScore)}
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
      <Col xs={24} md={9}>
        <p>
          <b>Sex:</b>
          <br /> {gender === "f" ? "Female" : "Male"}
        </p>
        <p>
          <b>Links:</b>
          <br />
          <ExternalLink id={publishedName} isLM={false} library={libraryName} />
          <br />
          {!fromSearch ? precomputedLinks : ""}
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
      files: PropTypes.shape({
        CDSResults: PropTypes.string,
        PPPMResults: PropTypes.string,
      }),
    }),
    normalizedScore: PropTypes.number,
    matchingPixels: PropTypes.number,
    pppmScore: PropTypes.string,
    pppmRank: PropTypes.string,
  }).isRequired,
  compact: PropTypes.bool,
  fromSearch: PropTypes.bool,
};

SkeletonMeta.defaultProps = {
  compact: false,
  fromSearch: false
};
