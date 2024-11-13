import React from "react";
import PropTypes from "prop-types";
import LineSummary from "./LineSummary";
import PPPSummary from "./PPPSummary";
import SkeletonSummary from "./SkeletonSummary";
import ImageWithModal from "./ImageWithModal";

export default function SearchSummary({ searchAlgorithm, input }) {
  const thumbSrc = input.files.CDMThumbnail;
  const imgSrc = input.files.CDM;
  const maxHeight =
    input.anatomicalArea === "VNC" ||
    input.libraryName?.toLowerCase().includes("vnc")
      ? "350px"
      : null;

  const modalImage = (
    <ImageWithModal
      thumbSrc={thumbSrc}
      src={imgSrc}
      title={input.publishedName}
      vertical={
        input.anatomicalArea === "VNC" ||
        input.libraryName?.toLowerCase().includes("vnc")
      }
      maxHeight={maxHeight}
      fixAspectRatio
    />
  );

  if (searchAlgorithm === "pppm") {
    return <PPPSummary metaInfo={input}>{modalImage}</PPPSummary>;
  }

  if (input.type === "LMImage") {
    return <LineSummary lineMeta={input}>{modalImage}</LineSummary>;
  }

  return <SkeletonSummary metaInfo={input}>{modalImage}</SkeletonSummary>;
}

SearchSummary.propTypes = {
  input: PropTypes.object.isRequired,
  searchAlgorithm: PropTypes.string.isRequired,
};
