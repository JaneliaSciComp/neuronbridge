import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import ImageWithModal from "./ImageWithModal";
import LineMeta from "./LineMeta";

export default function LineSummary(props) {
  const { lineMeta } = props;

  const searchUrl = `/search?q=${lineMeta.publishedName}`;

  if (!lineMeta) {
    return (
      <Row>
        <Col span={24}>
          <p>Loading...</p>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col xs={24} lg={8}>
        <ImageWithModal
          thumbSrc={lineMeta.thumbnailURL}
          src={lineMeta.imageURL}
          title={lineMeta.publishedName}
        />
      </Col>
      <Col lg={12}>
        <LineMeta attributes={lineMeta} />
      </Col>
      <Col lg={4}>
        <Link to={searchUrl}>
          <Button >Back to all results</Button>
        </Link>
      </Col>
    </Row>
  );
}

LineSummary.propTypes = {
  lineMeta: PropTypes.object
};

LineSummary.defaultProps = {
  lineMeta: null
};
