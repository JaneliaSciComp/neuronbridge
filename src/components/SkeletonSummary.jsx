import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import SkeletonMeta from "./SkeletonMeta";

export default function SkeletonSummary(props) {
  const { metaInfo, children } = props;

  return (
    <Row>
      <Col xs={24} lg={8}>
        {children}
      </Col>
      <Col lg={16}>
        <SkeletonMeta attributes={{ image: metaInfo }} />
      </Col>
    </Row>
  );
}

SkeletonSummary.propTypes = {
  metaInfo: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
