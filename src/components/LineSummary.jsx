import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";
import ImageWithModal from "./ImageWithModal";
import LineMeta from "./LineMeta";

export default function LineSummary(props) {
  const { lineMeta } = props;
  const history = useHistory();

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
          thumbSrc={lineMeta.thumbnail_path}
          src={lineMeta.image_path}
          title={lineMeta.attrs["Published Name"]}
        />
      </Col>
      <Col lg={12}>
        <LineMeta attributes={lineMeta.attrs} />
      </Col>
      <Col lg={4}>
        <Button onClick={() => history.goBack()}>Back to all results</Button>
      </Col>
    </Row>
  );
}

LineSummary.propTypes = {
  lineMeta: PropTypes.object.isRequired
};
