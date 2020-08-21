import React from "react";
import PropTypes from "prop-types";
import "./MaskDrawing.css";

export default function MaskDrawing({ imgSrc }) {
  if (!imgSrc) {
    return (
      <div className="mdplaceholder">
        <h2>Choose a channel to create your mask</h2>
        <img src="/maskplaceholder.jpg" alt="desaturated color depth mip placeholder" />
      </div>
    );
  }

  return (
    <div className="mdplaceholder">
      <h2>Drawing canvas here for {imgSrc}</h2>
      <img src="/maskplaceholder.jpg" alt="desaturated color depth mip placeholder" />
    </div>
  );
}

MaskDrawing.propTypes = {
  imgSrc: PropTypes.string
};

MaskDrawing.defaultProps = {
  imgSrc: null
};
