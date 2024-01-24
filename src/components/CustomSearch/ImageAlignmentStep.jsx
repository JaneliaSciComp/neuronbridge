import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileVideo } from "@fortawesome/pro-regular-svg-icons";
import { signedLink } from "../../libs/awsLib";
import StepTitle from "./StepTitle";
import HelpButton from "../Help/HelpButton";

export default function ImageAlignmentStep({ state, search }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [movieUrl, setMovieUrl] = useState(null);

  useEffect(() => {
    if (search.alignmentMovie) {
      const relativeUrl = `${search.searchDir}/${search.alignmentMovie}`;
      signedLink(relativeUrl).then((result) => {
        setMovieUrl(result);
      });
    } else {
      setMovieUrl(null);
    }
  }, [search.searchDir, search.alignmentMovie]);

  useEffect(() => {
    if (search.uploadThumbnail) {
      const uploadUrl = `${search.searchDir}/${search.uploadThumbnail}`;
      signedLink(uploadUrl).then((result) => {
        setThumbnailUrl(result);
      });
    } else {
      setThumbnailUrl(null);
    }
  }, [search.searchDir, search.uploadThumbnail]);

  const handleQualityCheck = () => {
    if (Object.prototype.hasOwnProperty.call(window, 'fathom')) {
      // make sure the fathom code has been loaded and not blocked by an ad blocker.
      if (window.fathom) {
        window.fathom.trackGoal('View Alignment Quality check', 0);
      }
    }
  };

  const handleHelpClick = () => {
    if (Object.prototype.hasOwnProperty.call(window, 'fathom')) {
      // make sure the fathom code has been loaded and not blocked by an ad blocker.
      if (window.fathom) {
        window.fathom.trackGoal('Alignment Help Link', 0);
      }
    }
  };

  let content = "";
  if (["complete"].includes(state)) {
    const imgClass =
      search.anatomicalRegion && search.anatomicalRegion === "vnc"
        ? "verticalThumbnail"
        : "completeThumbnail";

    content = (
      <>
        <img
          className={imgClass}
          src={thumbnailUrl}
          alt="Alignment Thumbnail"
        />
        <span style={{ display: "block" }}>
          Score: {search.alignmentScore || "N/A"}
        </span>
        {movieUrl ? (
          <a href={movieUrl} onClick={handleQualityCheck}>
           <FontAwesomeIcon size="lg" icon={faFileVideo} /> Alignment Quality Check
          </a>
        ) : (
          ""
        )}
      </>
    );
  } else if (search.alignmentErrorMessage || search.errorMessage) {
    content = (
      <HelpButton target="UploadAlignment" text="Image alignment help" onClick={handleHelpClick} />
    );
  }

  return (
    <div>
      <StepTitle state={state} step={2} text="Image Alignment" />
      {content}
    </div>
  );
}

ImageAlignmentStep.propTypes = {
  state: PropTypes.string.isRequired,
  search: PropTypes.object.isRequired,
};
