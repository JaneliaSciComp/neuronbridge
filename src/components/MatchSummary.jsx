import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";
import LibraryType from "./LibraryType";

export default function MatchSummary(props) {
  const { match, showModal, isLM } = props;

  return (
    <Row className="matchSummary">
      <Col span={8}>
        <ImageWithModal
          thumbSrc={match.thumbnail_path}
          src={match.image_path}
          alt={match.attrs.PublishedName}
          showModal={showModal}
        />
      </Col>
      <Col span={8}>
        <p>
          <b>{isLM ? 'Line Name' : 'Body Id' }:</b> {match.attrs.PublishedName}
        </p>
        <p>
          <b>Matched Slices:</b> {match.attrs["Matched slices"]}
        </p>
        <p>
          <b>Score:</b> {match.attrs.Score}
        </p>
        <LibraryType type={match.attrs.Library} />
      </Col>
      <Col span={8}>
        <Button onClick={showModal}>Select</Button>
      </Col>
    </Row>
  );
}

MatchSummary.propTypes = {
  match: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  isLM:PropTypes.bool
};

MatchSummary.defaultProps = {
  isLM: true
};
