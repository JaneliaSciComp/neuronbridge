import React from "react";
import PropTypes from "prop-types";
import { Divider, Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";
import LibraryType from "./LibraryType";
import ExternalLink from "./ExternalLink";

export default function MatchSummary(props) {
  const { match, showModal, isLM, gridView } = props;

  if (gridView) {
    return (
      <Col xs={24} md={12} lg={8} xl={6}>
        <ImageWithModal
          thumbSrc={match.thumbnail_path}
          src={match.image_path}
          alt={match.attrs["Published Name"]}
          showModal={showModal}
        />
        <p style={{ paddingLeft: "2em" }}>
          <ExternalLink publishedName={match.attrs["Published Name"]} isLM={isLM} />{" "}
          (Score: {match.attrs["Matched pixels"]})
        </p>
      </Col>
    );
  }

  return (
    <>
      <Row className="matchSummary">
        <Col span={8}>
          <ImageWithModal
            thumbSrc={match.thumbnail_path}
            src={match.image_path}
            alt={match.attrs["Published Name"]}
            showModal={showModal}
          />
        </Col>
        <Col span={8}>
          <p>
            <b>{isLM ? "Line Name" : "Body Id"}:</b>{" "}
            <ExternalLink
              publishedName={match.attrs["Published Name"]}
              isLM={isLM}
            />
          </p>
          <p>
            <b>Score:</b> {match.attrs["Matched pixels"]}
          </p>
          {isLM && (
            <p>
              <b>Channel:</b> {match.attrs.Channel}
            </p>
          )}
          <LibraryType type={match.attrs.Library} />
        </Col>
        <Col span={8}>
          <Button onClick={showModal}>Select</Button>
        </Col>
      </Row>
      <Divider dashed />
    </>
  );
}

MatchSummary.propTypes = {
  match: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  isLM: PropTypes.bool,
  gridView: PropTypes.bool.isRequired
};

MatchSummary.defaultProps = {
  isLM: true
};
