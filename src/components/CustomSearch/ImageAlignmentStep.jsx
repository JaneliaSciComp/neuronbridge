import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { signedLink } from "../../libs/awsLib";
import StepTitle from "./StepTitle";

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
    content = (
      <>
        <img
          className="completeThumbnail"
          src={thumbnailUrl}
          alt="Alignment Thumbnail"
        />
        <Button
          style={{ marginTop: "0.5em", width: "150px" }}
        >
          parameters
        </Button>
      </>
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
