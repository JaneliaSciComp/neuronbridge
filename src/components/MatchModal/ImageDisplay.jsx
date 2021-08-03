/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";
import MousePosition from "./MousePosition";
import { signedPublicLink } from "../../libs/awsLib";

const ImageDisplay = props => {
  const {
    src,
    alt,
    meta,
    mousePosition,
    setMousePosition
  } = props;
  const [mirrored, setMirrored] = useState(false);
  const [signedSrc, setSignedSrc] = useState();

  const isPPP = Boolean(meta.files && meta.files.ColorDepthMipSkel);

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
      <Row>
        {isPPP ? (
          ""
        ) : (
          <Button
            icon={
              <FontAwesomeIcon
                icon={faRepeat}
                style={{ marginRight: "0.5em" }}
              />
            }
            onClick={() => setMirrored(mState => !mState)}
          >
            {mirrored ? "Restore" : "Flip"}
          </Button>
        )}
      </Row>
    </>
  );
};

export default ImageDisplay;
