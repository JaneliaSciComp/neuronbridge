import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";
import SkeletonMeta from "./SkeletonMeta";

export default function SkeletonResult(props) {
  const location = useLocation();
  const { metaInfo } = props;

  const matchesUrl = `/search/skeletons/${metaInfo.publishedName}/matches/${metaInfo.id}`;

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
        <Button
          aria-label="View LM Matches"
          type="primary"
          disabled={/matches$/.test(location.pathname)}
        >
          <Link to={matchesUrl}>View LM Matches</Link>
        </Button>
      </Col>
    </Row>
  );
}

SkeletonResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
