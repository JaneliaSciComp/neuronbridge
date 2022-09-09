import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import LineMeta from "./LineMeta";

export default function LineResult(props) {
  const location = useLocation();
  const { metaInfo, children } = props;

  const matchesUrl = `/search/lines/${metaInfo.publishedName}/matches/${metaInfo.id}`;

  return (
    <Row>
      <Col md={10}>{children}</Col>
      <Col md={9}>
        <LineMeta attributes={{ image: metaInfo }} />
      </Col>
      <Col md={5}>
        {metaInfo?.files?.CDSResults ? (
          <Button type="primary" disabled={/matches$/.test(location.pathname)}>
            <Link to={matchesUrl}>Color Depth Search Results</Link>
          </Button>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
}

LineResult.propTypes = {
  metaInfo: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
