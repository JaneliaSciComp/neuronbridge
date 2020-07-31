import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Divider, Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";
import ExternalLink from "./ExternalLink";
import LineMeta from "./LineMeta";
import SkeletonMeta from "./SkeletonMeta";
import { FilterContext } from "../containers/FilterContext";

export default function MatchSummary(props) {
  const { match, showModal, isLM, gridView } = props;

  const [filterState] = useContext(FilterContext);

  const publishedName =
    match.attrs["Published Name"] ||
    match.attrs.PublishedName ||
    match.attrs["Body Id"];

  if (gridView) {
    const score =
      filterState.sortResultsBy === 2
        ? `(Matched Pixels: ${match.attrs["Matched pixels"]})`
        : `(Score: ${Math.round(match.normalizedScore)})`;
    return (
      <Col xs={24} md={12} lg={8} xl={6}>
        <ImageWithModal
          thumbSrc={match.thumbnail_path}
          src={match.image_path}
          alt={publishedName}
          showModal={showModal}
        />
        <p style={{ paddingLeft: "2em" }}>
          <ExternalLink
            publishedName={publishedName}
            isLM={isLM}
            library={match.attrs.Library}
          />{" "}
          {score}
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
            alt={publishedName}
            showModal={showModal}
          />
        </Col>
        <Col span={8}>
          {isLM ? (
            <LineMeta
              attributes={match.attrs}
              score={Math.round(match.normalizedScore)}
            />
          ) : (
            <SkeletonMeta
              attributes={match.attrs}
              score={Math.round(match.normalizedScore)}
            />
          )}
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
