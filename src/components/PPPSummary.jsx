import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SkeletonMeta from "./SkeletonMeta";

export default function PPPSummary({ metaInfo, children }) {

  const searchUrl = `/search?q=${metaInfo.publishedName}`;

  return (
    <Row>
      <Col xs={24} lg={8}>
        {children}
      </Col>
      <Col lg={12}>
        <SkeletonMeta attributes={{ image: metaInfo}} />
      </Col>
      <Col lg={4}>
        <Link to={searchUrl}>
          <Button>Back to all results</Button>
        </Link>
      </Col>
    </Row>
  );
}

PPPSummary.propTypes = {
  metaInfo: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
