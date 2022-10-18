import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";

export default function MirrorButton ({mirrored, onClick }) {
  return (
    <Button style={{marginRight: "0.5em" }} onClick={() => onClick(!mirrored)}>
      <FontAwesomeIcon icon={faRepeat} style={{ marginRight: "0.5em" }} />
      {mirrored ? "Unmirror" : "Mirror"}
    </Button>
  );
}

MirrorButton.propTypes = {
  mirrored: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
