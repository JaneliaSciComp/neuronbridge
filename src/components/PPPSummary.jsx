import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";
import SkeletonMeta from "./SkeletonMeta";

export default function PPPSummary({ metaInfo }) {

  const searchUrl = `/search?q=${metaInfo.publishedName}`;

  return (
    <Row>
      <Col xs={24} lg={8}>
        <ImageWithModal thumbSrc={metaInfo.thumbnailURL} src={metaInfo.imageURL} title={metaInfo.publishedName} />
      </Col>
      <Col lg={12}>
        <SkeletonMeta attributes={metaInfo} />
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
  metaInfo: PropTypes.object.isRequired
};
