import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import { Row, Col } from "antd";

export default function AlignmentMeta({metadata}) {
  return (
    <Row>
      <Col md={24} lg={12}>
        <p>
          <b>Alignment Parameters:</b>
        </p>
        <p>
          <b>Started:</b>{" "}
          {formatRelative(new Date(metadata.alignStarted), new Date())}{" "}
        </p>
        <p>
          <b>Finished:</b>{" "}
          {formatRelative(new Date(metadata.alignFinished), new Date())}{" "}
        </p>
      </Col>
      <Col md={24} lg={12}>
        <p>
          <b>voxelX:</b> {metadata.voxelX}
        </p>
        <p>
          <b>voxelY:</b> {metadata.voxelY}
        </p>
        <p>
          <b>voxelZ:</b> {metadata.voxelZ}
        </p>
      </Col>
    </Row>
  );

}

AlignmentMeta.propTypes = {
  metadata: PropTypes.object.isRequired
};
