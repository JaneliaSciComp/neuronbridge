import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

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

  return (
    <Row className="imageComparison">
      {maskOpen && (
        <Col md={12}>
          <canvas ref={maskRef} width="500" height="250" />
          <img src={maskPath} ref={maskImageRef} alt="Mask for search" />
        </Col>
      )}
      <Col md={maskOpen ? 12 : 24}>
        <canvas ref={matchRef} width="500" height="250" />
        <img src={matchPath || matchThumbnail} alt="Search Match" />
      </Col>
    </Row>
  );
}

ImageComparison.propTypes = {
  maskOpen: PropTypes.bool.isRequired,
  maskPath: PropTypes.string.isRequired,
  matchPath: PropTypes.string.isRequired,
  matchThumbnail: PropTypes.string.isRequired
};
