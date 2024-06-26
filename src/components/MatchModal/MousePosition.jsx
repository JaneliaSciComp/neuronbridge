import React, { useRef, useEffect } from "react";
import { Dropdown } from "antd";
import PropTypes from "prop-types";
import { useCoords } from "../../containers/MouseCoordsContext";

function getMousePos(evt) {
  const canvas = evt.target;
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) * canvas.width) / canvas.clientWidth,
    y: ((evt.clientY - rect.top) * canvas.height) / canvas.clientHeight
  };
}

function clearCrosshair(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawCrosshair(x, y, ctx) {
  const armLength = 20;
  clearCrosshair(ctx);
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

export default function MousePosition({ vertical, contextMenu, imageDimensions }) {
  const { state, dispatch } = useCoords();

  const canvasRef = useRef();

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    const currentCtx = currentCanvas.getContext("2d");
    drawCrosshair(state.position[0], state.position[1], currentCtx);
  }, [state.position]);

  useEffect(() => {
    const currentCanvas = canvasRef.current;

    function movecrosshair(e) {
      const pos = getMousePos(e);
      dispatch({ type: "update", payload: [pos.x, pos.y] });
    }
    currentCanvas.addEventListener("mousemove", movecrosshair);

    function removecrosshair() {
      dispatch({ type: "clear" });
    }
    currentCanvas.addEventListener("mouseout", removecrosshair);

    return function cleanup() {
      currentCanvas.removeEventListener("mouseout", removecrosshair);
      currentCanvas.removeEventListener("mousemove", movecrosshair);
    };
  }, [dispatch]);

  const canvas = (      <canvas
        ref={canvasRef}
        height={vertical ? imageDimensions.vertical[0]: imageDimensions.horizontal[0]}
        width={vertical ? imageDimensions.vertical[1]: imageDimensions.horizontal[1]}
      /> );


  if (!contextMenu) {
    return canvas
  }

  return (
    <Dropdown overlay={contextMenu} trigger={["contextMenu"]}>
      {canvas}
    </Dropdown>
  );
}

MousePosition.propTypes = {
  vertical: PropTypes.bool.isRequired,
  contextMenu: PropTypes.node,
  imageDimensions: PropTypes.object.isRequired
};

MousePosition.defaultProps = {
  contextMenu: null
}
