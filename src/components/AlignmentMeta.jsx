import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

export default function AlignmentMeta({ metadata }) {
  return (
    <Row>
      <Col md={24} lg={1} />
      <Col md={24} lg={7}>
        <p>
          <b>Template Matching Algorithm:</b> {metadata.algorithm === "avg" ? "Median Intensity" : "Maximum Intensity" }
        </p>
        <p>
          <b>Reference Channel Index:</b> {metadata.referenceChannel || "Auto-detect"}
        </p>
        <p>
          <b>Voxel Size (microns)</b> {metadata.voxelX} x {metadata.voxelY} x{" "}
          {metadata.voxelZ}
        </p>
      </Col>
    </Row>
  );
}

AlignmentMeta.propTypes = {
  metadata: PropTypes.object.isRequired
};
