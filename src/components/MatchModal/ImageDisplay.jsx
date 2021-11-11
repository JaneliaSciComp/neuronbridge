/* eslint-disable react/prop-types */
import React from "react";
import { Row } from "antd";
import MousePosition from "./MousePosition";
import ImagePlaceholder from "../ImagePlaceholder";

const imageDimensions = {
  vertical: ["900px", "461px"],
  horizontal: ["566px", "1210px"]
};

const ImageDisplay = props => {
  const { src, alt, mirrored, vertical, contextMenu } = props;

  const placeholderSrc = vertical
    ? "/vnc_placeholder.png"
    : "/brain_placeholder.png";

  const widthRestrict = vertical ? { maxWidth: imageDimensions.vertical[1] } : null;

  return (
    <>
      <Row className="imageComparison" style={widthRestrict}>
        <MousePosition
          vertical={vertical}
          contextMenu={contextMenu}
          imageDimensions={imageDimensions}
        />
        <ImagePlaceholder
          src={src}
          alt={alt}
          mirrored={mirrored}
          imageDimensions={
            vertical ? imageDimensions.vertical : imageDimensions.horizontal
          }
          placeholderSrc={placeholderSrc}
        />
      </Row>
    </>
  );
};

export default ImageDisplay;
