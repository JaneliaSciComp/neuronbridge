import React, { useContext } from "react";
import PropTypes from "prop-types";
import LineSummary from "./LineSummary";
import PPPSummary from "./PPPSummary";
import SkeletonSummary from "./SkeletonSummary";
import ImageWithModal from "./ImageWithModal";
import { AppContext } from "../containers/AppContext";

export default function SearchSummary({ searchAlgorithm, input }) {
  const { appState } = useContext(AppContext);

  const { store } = input;

  const thumbSrc = `${appState?.dataConfig?.stores[store]?.prefixes?.ColorDepthMipThumbnail}${input.files.ColorDepthMipThumbnail}`;
  const imgSrc = `${appState?.dataConfig?.stores[store]?.prefixes?.ColorDepthMip}${input.files.ColorDepthMip}`

  const modalImage = (
    <ImageWithModal
      thumbSrc={thumbSrc}
      src={imgSrc}
      title={input.publishedName}
      vertical={
        input.anatomicalArea === "VNC" ||
        input.libraryName?.toLowerCase().includes("vnc")
      }
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
  searchAlgorithm: PropTypes.string.isRequired
};
