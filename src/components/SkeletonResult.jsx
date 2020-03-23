import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";

export default function SkeletonResult(props) {
  const location = useLocation();
  const { metaInfo } = props;

  const matchesUrl = `${location.pathname}/matches/${metaInfo.id}`;


  // only use values in the metaInfo.attrs key to display on the site. The
  // other keys are for internal use only.
  return (
    <Row>
      <Col span={8}>
        <ImageWithModal thumbSrc={metaInfo.thumbnail_path} src={metaInfo.image_path} title={metaInfo.attrs["Body Id"]} />
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
        <Button type="primary" disabled={/matches$/.test(location.pathname)}>
          <Link to={matchesUrl}>View LM Matches</Link>
        </Button>
      </Col>
    </Row>
  );
}

SkeletonResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
