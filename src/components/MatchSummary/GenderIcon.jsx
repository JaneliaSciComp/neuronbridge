import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";

export default function GenderIcon({ gender }) {
  const icon = (gender === 'f') ? "F" : "M";

  return (
    <div
      style={{
        position: "absolute",
        bottom: "12px",
        left: gender === "f" ? "22px" : "20px",
        zIndex: 2,
        color: "#fff",
        fontWeight: "bold"
      }}
    >
      <Tooltip title={gender === "f" ? "Female": "Male"} placement="left">
      {icon}
      </Tooltip>
    </div>
  );
}

GenderIcon.propTypes = {
  gender: PropTypes.string.isRequired,
};
