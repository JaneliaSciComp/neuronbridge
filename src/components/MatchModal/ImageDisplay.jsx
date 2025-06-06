/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Row } from "antd";
import MousePosition from "./MousePosition";
import ImagePlaceholder from "../ImagePlaceholder";
import { signedLink } from "../../libs/awsLib";

const imageDimensions = {
  vertical: ["900px", "461px"],
  horizontal: ["566px", "1210px"],
};

function ImageDisplay(props) {
  const { src, alt, mirrored, vertical, contextMenu, debug } = props;

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!src) {
      setImageUrl('/not_available.gif');
    } else if (!src.match(/^http/)) {
      signedLink(src).then((result) => {
        setImageUrl(result);
      });
    } else {
      setImageUrl(src);
    }
  }, [src]);

  const placeholderSrc = vertical
    ? "/vnc_placeholder.png"
    : "/brain_placeholder.png";

  const widthRestrict = vertical
    ? { maxWidth: imageDimensions.vertical[1] }
    : null;

  /* always set the mirrored prop to false if src is not available, so that
     the message text is displayed correctly */
  const isMirrored = src ? mirrored : false;

  return (
    <Row className="imageComparison" style={widthRestrict}>
      <MousePosition
        vertical={vertical}
        contextMenu={contextMenu}
        imageDimensions={imageDimensions}
      />
      <ImagePlaceholder
        src={imageUrl}
        alt={alt}
        mirrored={isMirrored}
        imageDimensions={
          vertical ? imageDimensions.vertical : imageDimensions.horizontal
        }
        placeholderSrc={placeholderSrc}
      />
      {debug ? <p>{imageUrl}</p> : ""}
    </Row>
  );
};

export default ImageDisplay;
