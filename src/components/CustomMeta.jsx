import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import { Row, Col } from "antd";

export default function CustomMeta({metadata}) {
  return (
    <Row>
      <Col md={24} lg={12}>
        <p>
          <b>Name:</b> {metadata.upload}
        </p>
        <p>
          <b>Created:</b>{" "}
          {formatRelative(new Date(metadata.createdOn), new Date())}{" "}
        </p>
        <p>
          <b>Updated:</b>{" "}
          {formatRelative(new Date(metadata.updatedOn), new Date())}{" "}
        </p>
      </Col>
      <Col md={24} lg={12}>
        <p>
          <b>Anatomical Area:</b> {metadata.anatomicalRegion}
        </p>
        <p>
          <b>Ref. Channel:</b> {metadata.referenceChannel || "Auto-detect"}
        </p>
        <p>
          <b>Algorithm:</b> {metadata.algorithm}
        </p>
      </Col>
    </Row>
  );
}

CustomMeta.propTypes = {
  metadata: PropTypes.object.isRequired
};
