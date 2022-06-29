import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/pro-regular-svg-icons";

export default function GenderIcon({ gender }) {
  const icon = (gender === 'f') ? faVenus : faMars;

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "20px",
        zIndex: 2,
        color: (gender === 'f') ? "#ffe1ea" : "#d6eaff"
      }}
    >
      <FontAwesomeIcon icon={icon} size="2x" />
    </div>
  );
}

GenderIcon.propTypes = {
  gender: PropTypes.string.isRequired,
};
