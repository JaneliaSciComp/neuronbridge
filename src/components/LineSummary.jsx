import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";
import ImageWithModal from "./ImageWithModal";

export default function LineSummary(props) {
  const { lineMeta } = props;
  const history = useHistory();

  return (
    <Row>
      <Col span={8}>
        <ImageWithModal thumbSrc={lineMeta.thumbnail_path} src={lineMeta.image_path} alt="MIP" />
      </Col>
      <Col span={6}>
        <p>
          <b>Line Name:</b> {lineMeta.attrs["Published Name"]}
        </p>
        <p>
          <b>Slide Code:</b> {lineMeta.attrs["Slide Code"]}
        </p>
        <p>
          <b>Channel:</b> {lineMeta.attrs.Channel}
        </p>
        <p>
          <b>Type:</b> {lineMeta.attrs.Library}
        </p>
      </Col>
       <Col span={6}>
        <p>
          <b>Gender:</b> {lineMeta.attrs.Gender === 'f' ? 'Female' : 'Male' }
        </p>
        <p>
          <b>Genotype:</b> {lineMeta.attrs.Genotype}
        </p>
        <p>
          <b>Alignment Space:</b> {lineMeta.attrs["Alignment Space"]}
        </p>
        <p>
          <b>Objective:</b> {lineMeta.attrs.Objective}
        </p>
      </Col>
      <Col span={4}>
        <Button onClick={() => history.goBack()}>Back to all results</Button>
      </Col>
    </Row>

  )

}

LineSummary.propTypes = {
  lineMeta: PropTypes.object.isRequired
};
