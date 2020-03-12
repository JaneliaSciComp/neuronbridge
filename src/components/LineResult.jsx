import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import "./LineResult.css";

export default function LineResult(props) {
  const location = useLocation();
  const { metaInfo } = props;

  const matchesUrl = `${location.pathname}/matches`;
  return (
    <Row>
      <Col span={8}>
        <img className="thumbnail" src={metaInfo.image_path} alt="fly brain" />
      </Col>
      <Col span={8}>
        <p>
          <b>Line Name:</b> {metaInfo.line}
        </p>
        <p>
          <b>Slide Code:</b> {metaInfo.attrs["Slide Code"]}
        </p>
        <p>
          <b>Channel:</b> {metaInfo.attrs.Channel}
        </p>
        <p>
          <b>Type:</b> {metaInfo.libraryName}
        </p>
      </Col>
      <Col span={8}>
        <Button type="primary">
          <Link to={matchesUrl}>View EM Matches</Link>
        </Button>
      </Col>
    </Row>
  );
}

LineResult.propTypes = {
  metaInfo: PropTypes.object.isRequired
};
