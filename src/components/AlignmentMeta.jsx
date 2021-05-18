import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Space, Typography } from "antd";

const { Text } = Typography;

const defaults = {
  anatomicalRegion: "brain",
  algorithm: null,
  referenceChannel: null,
  voxelX: null,
  voxelY: null,
  voxelZ: null
};

const notDefault = (
  <span title="Modified" style={{ color: "#ff0000", fontSize: "1.2em" }}>
    *
  </span>
);

// TODO: if voxel size is 0 / null for all dimensions, then show "not selected"
// TODO: add an asterisk next to items that have been changed from the default

export default function AlignmentMeta({ metadata }) {
  return (
    <Row>
      <Col md={24} lg={1} />
      <Col md={24} lg={7}>
        <Space direction="vertical">
          <Text>
            <b>
              Template Matching Algorithm
              {metadata.algorithm !== defaults.algorithm ? notDefault : ""}:
            </b>{" "}
            {metadata.algorithm === "avg"
              ? "Median Intensity"
              : "Maximum Intensity"}
          </Text>
          <Text>
            <b>
              Reference Channel Index
              {metadata.referenceChannel !== defaults.referenceChannel
                ? notDefault
                : ""}
              :
            </b>{" "}
            {metadata.referenceChannel || "Auto-detect"}
          </Text>
          <Text>
            <b>
              Anatomical Region{" "}
              {metadata.anatomicalRegion !== defaults.anatomicalRegion
                ? notDefault
                : ""}
              :
            </b>{" "}
            {metadata.anatomicalRegion || "brain"}
          </Text>
          <Text>
            <b>
              Voxel Size (microns)
              {metadata.voxelX !== defaults.voxelX ? notDefault : ""}:
            </b>{" "}
            {metadata.voxelX !== defaults.voxelX ? (
              <span>
                {metadata.voxelX} x {metadata.voxelY} x {metadata.voxelZ}
              </span>
            ) : (
              "Not defined"
            )}
          </Text>
          <Text>{notDefault} indicates a change from the default</Text>
        </Space>
      </Col>
    </Row>
  );
}

AlignmentMeta.propTypes = {
  metadata: PropTypes.object.isRequired
};
