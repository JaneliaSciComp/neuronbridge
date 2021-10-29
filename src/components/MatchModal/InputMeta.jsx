import React from "react";
import PropTypes from "prop-types";
import LineMeta from "../LineMeta";
import CustomMeta from "../CustomMeta";
import SkeletonMeta from "../SkeletonMeta";

export default function InputMeta({ mask, isLM, compact }) {
  let metaBlock = <p>Loading...</p>;

  if (mask) {
    if (!mask.createdOn) {
      if (!isLM) {
        metaBlock = <LineMeta attributes={mask} compact={compact} />;
      } else {
        // skeleton type from EM
        metaBlock = <SkeletonMeta attributes={mask} compact={compact} />;
      }
    } else {
      metaBlock = <CustomMeta metadata={mask} compact={compact} />;
    }
  }

  return (
    <>
      <h3>Input Image</h3>
      {metaBlock}
    </>
  );
}

InputMeta.propTypes = {
  isLM: PropTypes.bool.isRequired,
  mask: PropTypes.object,
  compact: PropTypes.bool
};

InputMeta.defaultProps = {
  mask: {},
  compact: false
};
