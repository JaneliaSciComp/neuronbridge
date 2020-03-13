import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";

export default function MatchSummary(props) {
  const { match } = props;
  const history = useHistory();

  return (
    <Row>
      <Col span={8}>
        <ImageWithModal
          thumbSrc={match.thumbnail_path}
          src={match.image_path}
          alt="MIP"
        />
      </Col>
      <Col span={8}>
        <p>
          <b>Line Name:</b> {match.attrs["Published Name"]}
        </p>
        <p>
          <b>Slide Code:</b> {match.attrs["Slide Code"]}
        </p>
        <p>
          <b>Channel:</b> {match.attrs.Channel}
        </p>
        <p>
          <b>Type:</b> {match.attrs.Library}
        </p>
      </Col>
      <Col span={8}>
        <Button onClick={() => history.goBack()}>Select</Button>
      </Col>
    </Row>
  );
}

MatchSummary.propTypes = {
  match: PropTypes.object.isRequired
};
