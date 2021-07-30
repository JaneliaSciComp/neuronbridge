import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

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

export default function MousePosition({mousePosition, setMousePosition}) {

  const canvasRef = useRef();

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    const currentCtx = currentCanvas.getContext("2d");
    drawCrosshair(mousePosition[0], mousePosition[1], currentCtx);
  },[mousePosition]);

  useEffect(() => {
    const currentCanvas = canvasRef.current;

    function movecrosshair(e) {
      const pos = getMousePos(e);
      setMousePosition([pos.x, pos.y]);
    }
    currentCanvas.addEventListener("mousemove", movecrosshair);

    return function cleanup() {
      currentCanvas.removeEventListener("mousemove", movecrosshair);
    }
  },[setMousePosition]);

  return <canvas ref={canvasRef} width="500" height="250" />
}

MousePosition.propTypes = {
  mousePosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  setMousePosition: PropTypes.func.isRequired
};
