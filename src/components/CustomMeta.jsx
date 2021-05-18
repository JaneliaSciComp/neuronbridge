import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import { Row, Col } from "antd";

export default function CustomMeta({metadata}) {
  return (
    <Row>
        <p>
          <b>Name:</b> {metadata.upload}
        </p>
      <Col md={24} lg={24}>
        <p>
          <b>Created:</b>{" "}
          {formatRelative(new Date(metadata.createdOn), new Date())}{" "}
        </p>
        <p>
          <b>Updated:</b>{" "}
          {formatRelative(new Date(metadata.updatedOn), new Date())}{" "}
        </p>
      </Col>
    </Row>
  );
}

CustomMeta.propTypes = {
  metadata: PropTypes.object.isRequired
};
