/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Row, Button } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";
import MaskSearchButton from "./MaskSearchButton";
import MatchSearchButton from "./MatchSearchButton";

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
    maskOpen
  } = props;
  const [mirrored, setMirrored] = useState(false);

  const style = mirrored
    ? { transition: "transform .25s ease-in-out", transform: "scaleX(-1)" }
    : { transition: "transform .25s ease-in-out", transform: "scaleX(1)" };

  const searchUrl = `/search?q=${meta.publishedName}`;

  return (
    <>
      <Row className="imageComparison">
        <canvas ref={ref} width="500" height="250" />
        <img src={src} style={style} alt={alt} />
      </Row>
      <Row>
        {!isMask && !maskOpen ? (
          <Button onClick={onShow} style={{ marginRight: "0.5em" }}>
            Show Mask
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
          {mirrored ? "Restore" : "Flip"} {isMask ? "Mask" : "Match"}
        </Button>
        {isMask ? (
          <MaskSearchButton mask={meta} isCopying={isCopying} setIsCopying={setIsCopying} />
        ) : (
          <MatchSearchButton match={meta} isCopying={isCopying} setIsCopying={setIsCopying} />
        )}
        {isMask ? (
          <Button style={{ marginLeft: "0.5em" }} onClick={onHide}>
            Hide Mask
          </Button>
        ) : (
          <Link
            className="ant-btn"
            style={{ marginLeft: "0.5em" }}
            to={searchUrl}
          >
            View Precomputed Search
          </Link>
        )}
      </Row>
    </>
  );
};

export default React.forwardRef(ImageDisplay);