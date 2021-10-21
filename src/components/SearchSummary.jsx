import React from "react";
import PropTypes from "prop-types";
import LineSummary from "./LineSummary";
import PPPSummary from "./PPPSummary";
import SkeletonSummary from "./SkeletonSummary";
import ImageWithModal from "./ImageWithModal";

export default function SearchSummary({ type, input }) {
  const modalImage = (
    <ImageWithModal
      thumbSrc={input.thumbnailURL}
      src={input.imageURL}
      title={input.publishedName}
    />
  );

  if (type === "lines") {
    return <LineSummary lineMeta={input}>{modalImage}</LineSummary>;
  }

  if (type === "ppp") {
    return <PPPSummary metaInfo={input}>{modalImage}</PPPSummary>;
  }

  return <SkeletonSummary metaInfo={input}>{modalImage}</SkeletonSummary>;
}

SearchSummary.propTypes = {
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired
};
