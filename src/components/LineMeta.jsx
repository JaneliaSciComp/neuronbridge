import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

import LibraryFormatter from "./LibraryFormatter";
import ExternalLink from "./ExternalLink";

export default function LineMeta({ attributes, score }) {
  const publishedName =
    attributes["Published Name"] || attributes.PublishedName;

  return (
    <Row>
      <Col md={24} lg={12}>
        <p>
          <b>Line Name:</b>
          <ExternalLink
            publishedName={publishedName}
            isLM
            library={attributes.Library}
          />
        </p>
        {score && (
          <p>
            <b>Score:</b> {score}
          </p>
        )}
        <p>
          <b>Slide Code:</b> {attributes["Slide Code"]}
        </p>
        <p>
          <b>Channel:</b> {attributes.Channel}
        </p>
        <p>
          <b>Library: </b>
          <LibraryFormatter type={attributes.Library} />
        </p>
      </Col>
      <Col md={24} lg={12}>
        <p>
          <b>Gender:</b> {attributes.Gender === "f" ? "Female" : "Male"}
        </p>
        <p>
          <b>Genotype:</b> {attributes.Genotype}
        </p>
        <p>
          <b>Alignment Space:</b> {attributes["Alignment Space"]}
        </p>
        <p>
          <b>Objective:</b> {attributes.Objective}
        </p>
      </Col>
    </Row>
  );
}

LineMeta.propTypes = {
  attributes: PropTypes.object.isRequired,
  score: PropTypes.number
};

LineMeta.defaultProps = {
  score: null
};
