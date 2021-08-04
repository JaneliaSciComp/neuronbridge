import React, { useRef, useEffect } from "react";
import { useCoords } from "../../containers/MouseCoordsContext";

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

export default function MousePosition() {

  const { state, dispatch } = useCoords();

  const canvasRef = useRef();

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    const currentCtx = currentCanvas.getContext("2d");
    drawCrosshair(state.position[0], state.position[1], currentCtx);
  },[state.position]);

  useEffect(() => {
    const currentCanvas = canvasRef.current;

    function movecrosshair(e) {
      const pos = getMousePos(e);
      dispatch({type: "update", payload: [pos.x, pos.y]});
    }
    currentCanvas.addEventListener("mousemove", movecrosshair);

    return function cleanup() {
      currentCanvas.removeEventListener("mousemove", movecrosshair);
    }
  },[dispatch]);

  return <canvas ref={canvasRef} width="500" height="250" />
}
