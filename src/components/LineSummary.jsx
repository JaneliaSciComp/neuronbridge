import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
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

  return (
    <Row>
      <Col xs={24} lg={8}>
        {children}
      </Col>
      <Col lg={16}>
        <LineMeta attributes={{image: lineMeta}} />
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
