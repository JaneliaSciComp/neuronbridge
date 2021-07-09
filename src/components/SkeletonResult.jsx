import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col, Space } from "antd";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";
import SkeletonMeta from "./SkeletonMeta";

export default function SkeletonResult(props) {
  const location = useLocation();
  const { metaInfo } = props;

  const matchesUrl = `/search/skeletons/${metaInfo.publishedName}/matches/${metaInfo.id}`;
  const pppUrl = `/search/ppp/${metaInfo.publishedName}/matches/${metaInfo.id}`;

  return (
    <Row>
      <Col md={10}>
        <ImageWithModal
          thumbSrc={metaInfo.thumbnailURL}
          src={metaInfo.imageURL}
          title={metaInfo.publishedName}
        />
      </Col>
      <Col md={8}>
        <SkeletonMeta attributes={metaInfo} />
      </Col>
      <Col md={6}>
        <Space direction="vertical">
          <Button
            aria-label="View Color Depth MIP Results"
            type="primary"
            disabled={/matches$/.test(location.pathname)}
          >
            <Link to={matchesUrl}>View Color Depth MIP Results</Link>
          </Button>
          <Button
            aria-label="View PatchPerPixMatch Results"
            type="primary"
            disabled={/matches$/.test(location.pathname)}
          >
            <Link to={pppUrl}>View PatchPerPixMatch Results </Link>
          </Button>
        </Space>
      </Col>
    </Row>
  );
}

SkeletonResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
