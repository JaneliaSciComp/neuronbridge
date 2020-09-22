import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";

import "./ImageComparison.css";

function getMousePos(evt) {
  const canvas = evt.target;
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) * canvas.width) / canvas.clientWidth,
    y: ((evt.clientY - rect.top) * canvas.height) / canvas.clientHeight
  };
}

function drawCrosshair(x, y, ctx) {
  const armLength = 20;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - armLength);
  ctx.moveTo(x, y);
  ctx.lineTo(x + armLength, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x - armLength, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + armLength);
  ctx.stroke();
}

export default function ImageComparison(props) {
  const { maskOpen, maskPath, matchPath, matchThumbnail } = props;

  const [mirrored, setMirrored] = useState(false);
  const [mirroredMatch, setMirroredMatch] = useState(false);
  const matchRef = useRef();
  const maskRef = useRef();
  const maskImageRef = useRef();

  useEffect(() => {
    const currentMatch = matchRef.current;
    const currentMask = maskRef.current;

    const matchCtx = currentMatch.getContext("2d");
    const maskCtx = currentMask ? currentMask.getContext("2d") : null;

    // change the width and height of the canvas to match the image
    // console.log(maskImageRef.current.width, maskImageRef.current.height);

    function movecrosshair(e) {
      const pos = getMousePos(e);
      if (matchCtx) {
        drawCrosshair(pos.x, pos.y, matchCtx);
      }
      if (maskCtx) {
        drawCrosshair(pos.x, pos.y, maskCtx);
      }
    }

    if (currentMatch) {
      currentMatch.addEventListener("mousemove", movecrosshair);
    }
    if (currentMask) {
      currentMask.addEventListener("mousemove", movecrosshair);
    }

    return function cleanup() {
      if (currentMatch) {
        currentMatch.removeEventListener("mousemove", movecrosshair);
      }

      if (currentMask) {
        currentMask.removeEventListener("mousemove", movecrosshair);
      }
    };
  }, [maskOpen, maskPath, matchPath]);

  function toggleMirrorMask() {
    setMirrored(mState => !mState);
  }

  function toggleMirrorMatch() {
    setMirroredMatch(mState => !mState);
  }

  const maskStyle = mirrored ? { transform: "scaleX(-1)" } : null;
  const matchStyle = mirroredMatch ? { transform: "scaleX(-1)" } : null;

  const maskState = mirrored ? "Restore" : "Flip";
  const matchState = mirroredMatch ? "Restore" : "Flip";

  return (
    <>
      <Row className="imageComparison">
        {maskOpen && (
          <Col md={12}>
            <canvas ref={maskRef} width="500" height="250" />
            <img
              src={maskPath}
              style={maskStyle}
              ref={maskImageRef}
              alt="Mask for search"
            />
          </Col>
        )}
        <Col md={maskOpen ? 12 : 24}>
          <canvas ref={matchRef} width="500" height="250" />
          <img
            src={matchPath || matchThumbnail}
            style={matchStyle}
            alt="Search Match"
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "0.5em" }}>
        {maskOpen && (
          <Col md={12}>
            <Button
              icon={<FontAwesomeIcon icon={faRepeat} style={{marginRight: "0.5em"}} />}
              onClick={() => toggleMirrorMask()}
            >
              {maskState} Mask
            </Button>
          </Col>
        )}
        <Col md={maskOpen ? 12 : 24}>
          <Button
            icon={<FontAwesomeIcon icon={faRepeat} style={{marginRight: "0.5em"}} />}
            onClick={() => toggleMirrorMatch()}
          >
           {matchState} Match
          </Button>
        </Col>
      </Row>
    </>
  );
}

ImageComparison.propTypes = {
  maskOpen: PropTypes.bool.isRequired,
  maskPath: PropTypes.string.isRequired,
  matchPath: PropTypes.string.isRequired,
  matchThumbnail: PropTypes.string.isRequired
};
