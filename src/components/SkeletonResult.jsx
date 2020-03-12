import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import "./LineResult.css";

export default function SkeletonResult(props) {
  const location = useLocation();
  const { metaInfo } = props;

  const matchesUrl = `${location.pathname}/matches`;


  // only use values in the metaInfo.attrs key to display on the site. The
  // other keys are for internal use only.
  return (
    <Row>
      <Col span={8}>
        <img className="thumbnail" src={metaInfo.thumbnail_path} alt="fly brain" />
      </Col>
      <Col span={8}>
        <p>
          <b>Body Id:</b> {metaInfo.attrs["Body Id"]}
        </p>
        <p>
          <b>Type:</b> {metaInfo.attrs.Library}
        </p>
      </Col>
      <Col span={8}>
        <Button type="primary">
          <Link to={matchesUrl}>View LM Matches</Link>
        </Button>
      </Col>
    </Row>
  );
}

SkeletonResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
