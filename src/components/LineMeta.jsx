import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import LibraryFormatter from "./LibraryFormatter";
import ExternalLink from "./ExternalLink";

export default function LineMeta({ attributes, score }) {
  const { publishedName, libraryName } = attributes;
  const searchUrl = `/search?q=${publishedName}`;
  return (
    <Row>
      <Col md={24} lg={12}>
        <p>
          <b>Line Name:</b>
          <Link to={searchUrl}>{publishedName}</Link>
        </p>
        {score && (
          <p>
            <b>Score:</b> {score}
          </p>
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
      </Col>
      <Col md={24} lg={12}>
        <p>
          <b>Gender:</b> {attributes.gender === "f" ? "Female" : "Male"}
        </p>
        <p>
          <b>Genotype:</b> {attributes.genotype}
        </p>
        <p>
          <b>Alignment Space:</b> {attributes.alignmentSpace}
        </p>
        <p>
          <b>Magnification:</b> {attributes.objective}
        </p>
        <p>
          <b>External Links:</b>{" "}
          <br />
          <ExternalLink
            publishedName={publishedName}
            isLM
            library={attributes.Library}
          />
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
