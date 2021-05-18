import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Checkbox, Divider, Row, Col, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import ImageWithModal from "./ImageWithModal";
import LineMeta from "./LineMeta";
import SkeletonMeta from "./SkeletonMeta";
import { FilterContext } from "../containers/FilterContext";
import { useMatches } from "../containers/MatchesContext";

export default function MatchSummary(props) {
  const { match, showModal, isLM, gridView } = props;
  const { state, dispatch } = useMatches();
  const checked = state.selected.includes(match.id);

  const [filterState] = useContext(FilterContext);
  const { publishedName } = match;

  const handleChange = () => {
    if (!checked) {
      dispatch({ type: "add", payload: match.id });
    } else {
      dispatch({ type: "remove", payload: match.id });
    }
  };

  if (gridView) {
    const score =
      filterState.sortResultsBy === 2
        ? `(Matched Pixels: ${match.matchingPixels})`
        : `(Score: ${Math.round(match.normalizedScore)})`;

    return (
      <Col xs={24} md={12} lg={8} xl={6}>
        <div style={{ position: "relative" }}>
          <Checkbox
            style={{
              position: "absolute",
              top: "6px",
              left: "20px",
              zIndex: 2
            }}
            onChange={handleChange}
            checked={checked}
          />
          <ImageWithModal
            thumbSrc={match.thumbnailURL}
            src={match.imageURL}
            alt={publishedName}
            showModal={showModal}
          />
        </div>
        <p style={{ paddingLeft: "2em" }}>
          <Button
            type="link"
            onClick={showModal}
            style={{ padding: "0.1em", margin: "none" }}
          >
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
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 12, order: 1 }}
          md={{ span: 8, order: 1 }}
        >
          <ImageWithModal
            thumbSrc={match.thumbnailURL}
            src={match.imageURL}
            alt={publishedName}
            showModal={showModal}
          />
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          sm={{ span: 24, order: 3 }}
          md={{ span: 10, order: 2 }}
        >
          {isLM ? (
            <LineMeta attributes={match} />
          ) : (
            <SkeletonMeta attributes={match} />
          )}
        </Col>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 12, order: 2 }}
          md={{ span: 6, order: 3 }}
        >
          <Button onClick={showModal} style={{ marginRight: "1em" }}>
            Select
          </Button>
          <Button
            onClick={handleChange}
            type={checked ? "primary" : "default"}
            ghost={checked}
          >
            Download {checked ? <CheckOutlined /> : null}
          </Button>
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
