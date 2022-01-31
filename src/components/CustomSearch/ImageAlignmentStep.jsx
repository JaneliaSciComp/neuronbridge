import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { signedLink } from "../../libs/awsLib";
import StepTitle from "./StepTitle";
import HelpButton from "../Help/HelpButton";

export default function ImageAlignmentStep({ state, search }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    if (search.uploadThumbnail) {
      const uploadUrl = `${search.searchDir}/${search.uploadThumbnail}`;
      signedLink(uploadUrl).then(result => {
        setThumbnailUrl(result);
      });
    } else {
      setThumbnailUrl(null);
    }
  }, [search.searchDir, search.uploadThumbnail]);

  let content = "";
  if (["complete"].includes(state)) {
    const imgClass =
      search.anatomicalRegion && search.anatomicalRegion === "vnc"
        ? "verticalThumbnail"
        : "completeThumbnail";

    content = (
      <img className={imgClass} src={thumbnailUrl} alt="Alignment Thumbnail" />
    );
  } else if (search.alignmentErrorMessage || search.errorMessage) {
    content = (
      <HelpButton target="UploadAlignment" text="Image alignment help" />
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
  search: PropTypes.object.isRequired
};
