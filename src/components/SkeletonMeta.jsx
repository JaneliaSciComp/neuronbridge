import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

import LibraryType from "./LibraryType";
import ExternalLink from "./ExternalLink";

export default function SkeletonMeta({ attributes, score }) {
  const publishedName =
    attributes["Published Name"] || attributes.PublishedName || attributes["Body Id"];

  return (
    <Row>
      <Col md={24} lg={24}>
        <p>
          <b>Body Id:</b>
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
        <LibraryType type={attributes.Library} />
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
