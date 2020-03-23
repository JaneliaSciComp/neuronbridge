import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";

export default function LineResult(props) {
  const location = useLocation();
  const { metaInfo } = props;

  const matchesUrl = `${location.pathname}/matches/${metaInfo.id}`;


  // only use values in the metaInfo.attrs key to display on the site. The
  // other keys are for internal use only.
  return (
    <Row>
      <Col span={8}>
        <ImageWithModal thumbSrc={metaInfo.thumbnail_path} src={metaInfo.image_path} title={metaInfo.attrs["Published Name"]} />
      </Col>
      <Col span={8}>
        <p>
          <b>Line Name:</b> {metaInfo.attrs["Published Name"]}
        </p>
        <p>
          <b>Slide Code:</b> {metaInfo.attrs["Slide Code"]}
        </p>
        <p>
          <b>Channel:</b> {metaInfo.attrs.Channel}
        </p>
        <p>
          <b>Type:</b> {metaInfo.attrs.Library}
        </p>
      </Col>
      <Col span={8}>
        <Button type="primary" disabled={/matches$/.test(location.pathname)}>
          <Link to={matchesUrl}>View EM Matches</Link>
        </Button>
      </Col>
    </Row>
  );
}

LineResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
