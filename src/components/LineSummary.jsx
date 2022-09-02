import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import LineMeta from "./LineMeta";

export default function LineSummary(props) {
  const { lineMeta, children } = props;


  if (!lineMeta) {
    return (
      <Row>
        <Col span={24}>
          <p>Loading...</p>
        </Col>
      </Row>
    );
  }

  const searchUrl = `/search?q=${lineMeta.publishedName}`;

  return (
    <Row>
      <Col xs={24} lg={8}>
        {children}
      </Col>
      <Col lg={12}>
        <LineMeta attributes={{image: lineMeta}} />
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
  lineMeta: PropTypes.object,
  children: PropTypes.node.isRequired
};

LineSummary.defaultProps = {
  lineMeta: null
};
