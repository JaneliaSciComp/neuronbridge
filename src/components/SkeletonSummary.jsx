import React from "react";
import { Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";
import LibraryType from "./LibraryType";

export default function SkeletonResult(props) {
  const { metaInfo } = props;

  const history = useHistory();

  return (
    <Row>
      <Col span={8}>
        <ImageWithModal thumbSrc={metaInfo.thumbnail_path} src={metaInfo.image_path} title={metaInfo.attrs["Body Id"]} />
      </Col>
      <Col span={12}>
        <p>
          <b>Body Id:</b> {metaInfo.attrs["Body Id"]}
        </p>
        <LibraryType type={metaInfo.attrs.Library} />
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
