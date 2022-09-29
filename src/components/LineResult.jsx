import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import LineMeta from "./LineMeta";

export default function LineResult(props) {
  const location = useLocation();
  const { metaInfo, children } = props;

  function generateCdmResultsButton() {
    const matchesUrl = `/matches/cdm/${metaInfo.files?.CDSResults.replace(
      /\.json$/,
      ""
    )}`;
    return (

          <Button type="primary" disabled={/matches$/.test(location.pathname)}>
            <Link to={matchesUrl}>Color Depth Search Results</Link>
          </Button>
    );
  }

  return (
    <Row>
      <Col md={10}>{children}</Col>
      <Col md={9}>
        <LineMeta attributes={{ image: metaInfo }} fromSearch />
      </Col>
      <Col md={5}>
        {metaInfo?.files?.CDSResults ? generateCdmResultsButton() : ""}
      </Col>
    </Row>
  );
}

LineResult.propTypes = {
  metaInfo: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
