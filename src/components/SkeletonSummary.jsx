import React from "react";
import { Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";

export default function SkeletonResult(props) {
  const { metaInfo } = props;

  const history = useHistory();

  return (
    <Row>
      <Col span={8}>
        <ImageWithModal thumbSrc={metaInfo.thumbnail_path} src={metaInfo.image_path} alt="MIP" />
      </Col>
      <Col span={12}>
        <p>
          <b>Body Id:</b> {metaInfo.attrs["Body Id"]}
        </p>
        <p>
          <b>Type:</b> {metaInfo.attrs.Library}
        </p>
      </Col>
      <Col span={4}>
        <Button onClick={() => history.goBack()}>Back to all results</Button>
      </Col>
    </Row>
  );
}

SkeletonResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
