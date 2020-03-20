import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";

export default function MatchSummary(props) {
  const { match, showModal } = props;

  return (
    <Row className="matchSummary">
      <Col span={8}>
        <ImageWithModal
          thumbSrc={match.thumbnail_path}
          src={match.image_path}
          alt="MIP"
          showModal={showModal}
        />
      </Col>
      <Col span={8}>
        <p>
          <b>Line Name:</b> {match.attrs.PublishedName}
        </p>
        <p>
          <b>Matched Slices:</b> {match.attrs["Matched slices"]}
        </p>
        <p>
          <b>Score:</b> {match.attrs.Score}
        </p>
        <p>
          <b>Type:</b> {match.attrs.Library}
        </p>
      </Col>
      <Col span={8}>
        <Button onClick={showModal}>Select</Button>
      </Col>
    </Row>
  );
}

MatchSummary.propTypes = {
  match: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired
};
