/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Row } from "antd";
import MousePosition from "./MousePosition";
import { signedPublicLink } from "../../libs/awsLib";

const ImageDisplay = props => {
  const {
    src,
    alt,
    mousePosition,
    setMousePosition,
    mirrored
  } = props;
  const [signedSrc, setSignedSrc] = useState();

  useEffect(() => {
    if (src) {
      signedPublicLink(src).then(signed => {
        setSignedSrc(signed);
      });
    }
  }, [src]);

  const style = mirrored
    ? { transition: "transform .25s ease-in-out", transform: "scaleX(-1)" }
    : { transition: "transform .25s ease-in-out", transform: "scaleX(1)" };

  return (
    <>
      <Row className="imageComparison">
        <MousePosition
          mousePosition={mousePosition}
          setMousePosition={setMousePosition}
        />
        {signedSrc ? <img src={signedSrc} style={style} alt={alt} /> : null}
      </Row>
    </>
  );
};

export default ImageDisplay;
