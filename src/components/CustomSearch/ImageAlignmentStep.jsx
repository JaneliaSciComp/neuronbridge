import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { signedLink } from "../../libs/awsLib";
import StepTitle from "./StepTitle";

export default function ImageAlignmentStep({ state, search}) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    if (search.displayableMask) {
      const uploadUrl = `${search.searchDir}/${search.displayableMask}`;
      signedLink(uploadUrl).then(result => {
        setThumbnailUrl(result);
      });
    } else {
      setThumbnailUrl(null);
    }
  }, [search]);




  let content = "";
  if (["complete"].includes(state)) {
    content = (
      <img className="completeThumbnail" src={thumbnailUrl} alt="Alignment Thumbnail"/>
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
}
