/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Row, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";
import MaskSearchButton from "./MaskSearchButton";
import DownloadButton from "./DownloadButton";
import { signedPublicLink } from "../../libs/awsLib";

const ImageDisplay = (props, ref) => {
  const {
    src,
    alt,
    meta,
    onHide,
    onShow,
    isCopying,
    setIsCopying,
    isMask = true,
    maskOpen,
    imageType
  } = props;
  const [mirrored, setMirrored] = useState(false);
  const [signedSrc, setSignedSrc] = useState();

  useEffect(() => {
    if (src) {
      const matched = src.match(/^http[s]:\/\/.*\.com\/([^/]*)\/(.*)/);
      if (matched) {
        const [, bucket, relativePath] = matched;
        signedPublicLink(relativePath, bucket).then(signed => {
          setSignedSrc(signed);
        });
      } else {
        setSignedSrc(src);
      }
    }
  }, [src]);

  const style = mirrored
    ? { transition: "transform .25s ease-in-out", transform: "scaleX(-1)" }
    : { transition: "transform .25s ease-in-out", transform: "scaleX(1)" };

  let downloadName = "image.png";
  if (meta.displayableMask) {
    downloadName = meta.displayableMask;
  } else if (meta.publishedName) {
    if (imageType) {
      downloadName = `${meta.publishedName}_${imageType}.png`;
    } else {
      downloadName = `${meta.publishedName}.png`;
    }
  }

  return (
    <>
      <Row className="imageComparison">
        <canvas ref={ref} width="500" height="250" />
        {signedSrc ? <img src={signedSrc} style={style} alt={alt} /> : null}
      </Row>
      <Row>
        {!isMask && !maskOpen ? (
          <Button onClick={onShow} style={{ marginRight: "0.5em" }}>
            Show Comparison
          </Button>
        ) : (
          ""
        )}

        <Button
          icon={
            <FontAwesomeIcon icon={faRepeat} style={{ marginRight: "0.5em" }} />
          }
          onClick={() => setMirrored(mState => !mState)}
        >
          {mirrored ? "Restore" : "Flip"}
        </Button>
        <MaskSearchButton
          src={src}
          isCopying={isCopying}
          setIsCopying={setIsCopying}
        />
        {isMask ? (
          <Button style={{ marginLeft: "0.5em" }} onClick={onHide}>
            Hide
          </Button>
        ) : (
          ""
        )}
        <DownloadButton
          style={{ marginLeft: "0.5em" }}
          imageURL={src}
          name={downloadName}
        />
      </Row>
    </>
  );
};

export default React.forwardRef(ImageDisplay);
