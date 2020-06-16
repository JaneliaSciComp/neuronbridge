import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Row, Col } from "antd";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";
import LineMeta from "./LineMeta";

export default function LineResult(props) {
  const location = useLocation();
  const { metaInfo } = props;

  const matchesUrl = `/search/lines/${metaInfo.publishedName}/matches/${metaInfo.id}`;

  // only use values in the metaInfo.attrs key to display on the site. The
  // other keys are for internal use only.
  return (
    <Row>
      <Col md={10}>
        <ImageWithModal
          thumbSrc={metaInfo.thumbnailURL}
          src={metaInfo.imageURL}
          title={metaInfo.publishedName}
        />
      </Col>
      <Col md={10}>
        <LineMeta attributes={metaInfo} />
      </Col>
      <Col md={4}>
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
