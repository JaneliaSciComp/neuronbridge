import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Divider } from "antd";
import ImageComparison from "./ImageComparison";
import DownloadZipCheckbox from "./DownloadZipCheckbox";
import LineMeta from "../LineMeta";
import CustomMeta from "../CustomMeta";
import SkeletonMeta from "../SkeletonMeta";

export default function Summary(props) {
  const {
    selectedMatch,
    mask,
    isLM,
    maskOpen,
    selected,
    matchesList,
    setMaskOpen
  } = props;

  let metaBlock = <p>Loading...</p>;

  if (mask)
    if (!mask.createdOn) {
      if (!isLM) {
        metaBlock = <LineMeta attributes={mask} />;
      } else {
        // skeleton type from EM
        metaBlock = <SkeletonMeta attributes={mask} />;
      }
    } else {
      metaBlock = <CustomMeta metadata={mask} />;
    }

  return (
    <>
      <Row>
        <Col sm={12}>
          <h3>Input Image</h3>
          {metaBlock}
        </Col>
        <Col sm={12}>
          <DownloadZipCheckbox matchId={selectedMatch.id} />
          <h3>
            Match {selected} of {matchesList.length}
          </h3>
          {isLM ? (
            <LineMeta attributes={selectedMatch} />
          ) : (
            <SkeletonMeta attributes={selectedMatch} />
          )}
        </Col>
      </Row>
      <Divider />
      <ImageComparison
        maskOpen={maskOpen}
        mask={mask}
        match={selectedMatch}
        matchPath={selectedMatch.imageURL}
        matchThumbnail={selectedMatch.thumbnailURL}
        setMaskOpen={setMaskOpen}
      />
    </>
  );
}

Summary.propTypes = {
  matchesList: PropTypes.arrayOf(PropTypes.object),
  isLM: PropTypes.bool.isRequired,
  selectedMatch: PropTypes.object.isRequired,
  mask: PropTypes.object,
  maskOpen: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
  setMaskOpen: PropTypes.func.isRequired
};

Summary.defaultProps = {
  matchesList: [],
  mask: {}
};
