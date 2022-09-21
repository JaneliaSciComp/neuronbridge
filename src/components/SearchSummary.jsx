import React, { useContext } from "react";
import PropTypes from "prop-types";
import LineSummary from "./LineSummary";
import PPPSummary from "./PPPSummary";
import SkeletonSummary from "./SkeletonSummary";
import ImageWithModal from "./ImageWithModal";
import { AppContext } from "../containers/AppContext";

export default function SearchSummary({ type, input }) {
  const { appState } = useContext(AppContext);
	const { prefixes } = appState.dataConfig;
  const modalImage = (
    <ImageWithModal
      thumbSrc={`${prefixes.ColorDepthMipThumbnail}${input.files.ColorDepthMipThumbnail}`}
      src={`${prefixes.ColorDepthMip}${input.files.ColorDepthMip}`}
      title={input.publishedName}
      vertical={
        input.anatomicalArea === "VNC" ||
        input.libraryName?.toLowerCase().includes("vnc")
      }
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
