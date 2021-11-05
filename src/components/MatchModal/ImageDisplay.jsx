/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Row } from "antd";
import MousePosition from "./MousePosition";
import { signedPublicLink } from "../../libs/awsLib";

const ImageDisplay = props => {
  const { src, alt, mirrored, vertical, contextMenu } = props;
  const [signedSrc, setSignedSrc] = useState();
  const [imageLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      signedPublicLink(src).then(signed => {
        const img = new Image();
        img.onload = () => {
          setSignedSrc(signed);
          setLoaded(true);
        }
        img.src = signed;
      });
    }
  }, [src]);

  function handleLoaded() {
    setLoaded(true);
  }

  const placeHolderSrc = vertical ? "/vnc_placeholder.png" : "/brain_placeholder.png";

  const style = mirrored
    ? { transition: "transform .25s ease-in-out", transform: "scaleX(-1)" }
    : { transition: "transform .25s ease-in-out", transform: "scaleX(1)" };

  return (
    <>
      <Row className="imageComparison">
        <MousePosition vertical={vertical} contextMenu={contextMenu} />
        {imageLoaded ? (
          <img src={signedSrc} style={style} alt={alt} onLoad={handleLoaded} />
        ) : (
          <img src={placeHolderSrc} alt="placeholder" />
        )}
      </Row>
    </>
  );
};

export default ImageDisplay;
