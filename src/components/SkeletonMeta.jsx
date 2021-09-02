import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import LibraryFormatter from "./LibraryFormatter";
import ExternalLink from "./ExternalLink";

export default function SkeletonMeta({ attributes }) {
  const { publishedName, libraryName } = attributes;

  const searchUrl = `/search?q=${publishedName}`;

  const neuronTypeAndInstance = (attributes.neuronType) ? [
    attributes.neuronType || "-",
    attributes.neuronInstance || "-"
  ].join(" / ") : "";

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
        {attributes.pppScore ? (
          <p>
            <b>Score:</b>
            <br /> {Math.round(attributes.pppScore)}
          </p>
        ) : (
          ""
        )}
        {attributes.pppRank ? (
          <p>
            <b>Rank:</b>
            <br /> {Math.round(attributes.pppRank)}
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
          <br /> {attributes.gender === "f" ? "Female" : "Male"}
        </p>
        <p>
          <b>Links:</b>
          <br />
          <ExternalLink
            publishedName={publishedName}
            isLM={false}
            library={libraryName}
          />
          <br />
          <Link to={searchUrl}>View Precomputed Search</Link>
        </p>
      </Col>
    </Row>
  );
}

SkeletonMeta.propTypes = {
  attributes: PropTypes.object.isRequired
};
