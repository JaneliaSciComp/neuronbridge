import React from "react";
import { Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";
import SkeletonMeta from "./SkeletonMeta";

export default function SkeletonResult(props) {
  const { metaInfo } = props;

  const history = useHistory();

  return (
    <Row>
      <Col xs={24} lg={8}>
        <ImageWithModal thumbSrc={metaInfo.thumbnailURL} src={metaInfo.imageURL} title={metaInfo.publishedName} />
      </Col>
      <Col lg={12}>
        <SkeletonMeta attributes={metaInfo} />
      </Col>
      <Col lg={4}>
        <Button onClick={() => history.goBack()}>Back to all results</Button>
      </Col>
    </Row>
  );
}

SkeletonResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
