import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Checkbox, Divider, Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";
import LineMeta from "./LineMeta";
import SkeletonMeta from "./SkeletonMeta";
import { FilterContext } from "../containers/FilterContext";

export default function MatchSummary(props) {
  const { match, showModal, isLM, gridView } = props;
  const [filterState] = useContext(FilterContext);
  const { publishedName } = match;

  const handleChange = () => {
    console.log(match);
  }

  if (gridView) {
    const score =
      filterState.sortResultsBy === 2
        ? `(Matched Pixels: ${match.matchingPixels})`
        : `(Score: ${Math.round(match.normalizedScore)})`;

    // TODO: add a checkbox here that when selected calls the onSelected callback
    // and adds the id of the match to the list of selected matches.
    return (
      <Col xs={24} md={12} lg={8} xl={6}>
        <Checkbox onChange={handleChange} />
        <ImageWithModal
          thumbSrc={match.thumbnailURL}
          src={match.imageURL}
          alt={publishedName}
          showModal={showModal}
        />
        <p style={{ paddingLeft: "2em" }}>
          <Button type="link" onClick={showModal} style={{ padding: '0.1em', margin: 'none' }}>
            {publishedName}
          </Button>
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
            thumbSrc={match.thumbnailURL}
            src={match.imageURL}
            alt={publishedName}
            showModal={showModal}
          />
        </Col>
        <Col span={10}>
          {isLM ? (
            <LineMeta
              attributes={match}
            />
          ) : (
            <SkeletonMeta
              attributes={match}
            />
          )}
        </Col>
        <Col span={6}>
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
