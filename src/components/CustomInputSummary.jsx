import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";
import ImageWithModal from "./ImageWithModal";
import CustomMeta from "./CustomMeta";
import AlignmentMeta from "./AlignmentMeta";

export default function CustomInputSummary({ searchMeta }) {
  const history = useHistory();

  return (
    <div style={{marginTop: '2em'}}>
      <h3>Input Mask</h3>
      <Row>
        <Col xs={24} lg={8}>
          <ImageWithModal
            thumbSrc={searchMeta.thumbnailURL}
            src={searchMeta.imageURL}
            title={searchMeta.upload}
          />
        </Col>
        <Col md={24} lg={12}>
          <CustomMeta metadata={searchMeta} />
        </Col>
        <Col md={24} lg={4}>
          <Button onClick={() => history.push("/upload")}>
            Back to all results
          </Button>
        </Col>
      </Row>
      {searchMeta.alignFinished ? (
        <AlignmentMeta metadata={searchMeta} />
      ): null}
    </div>
  );
}

CustomInputSummary.propTypes = {
  searchMeta: PropTypes.object.isRequired
};
