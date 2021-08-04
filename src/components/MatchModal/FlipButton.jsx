import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";

export default function FlipButton({ isPPP, mirrored, onClick }) {
  if (isPPP) {
    return "";
  }
  return (
    <Button
      icon={
        <FontAwesomeIcon icon={faRepeat} style={{ marginRight: "0.5em" }} />
      }
      onClick={() => onClick(mState => !mState)}
    >
      {mirrored ? "Restore" : "Flip"}
    </Button>
  );
}

FlipButton.propTypes = {
  isPPP: PropTypes.bool.isRequired,
  mirrored: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
