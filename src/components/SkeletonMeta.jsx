import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import LibraryFormatter from "./LibraryFormatter";
import ExternalLink from "./ExternalLink";

export default function SkeletonMeta({ attributes, score }) {
  const { publishedName, libraryName } = attributes;

  const searchUrl = `/search?q=${publishedName}`;
  return (
    <Row>
      <Col md={24} lg={24}>
        <p>
          <b>Body Id:</b>
          <Link to={searchUrl}>{publishedName}</Link>
        </p>
        {score && (
          <p>
            <b>Score:</b> {score}
          </p>
        )}
        <p>
          <b>Library: </b>
          <LibraryFormatter type={libraryName} />
        </p>
        <p>
          <b>Gender:</b> {attributes.gender === "f" ? "Female" : "Male"}
        </p>
        <p>
          <b>External Links:</b>
          <br />
          <ExternalLink
            publishedName={publishedName}
            isLM={false}
            library={libraryName}
          />
        </p>
      </Col>
    </Row>
  );
}

SkeletonMeta.propTypes = {
  attributes: PropTypes.object.isRequired,
  score: PropTypes.number
};

SkeletonMeta.defaultProps = {
  score: null
};
