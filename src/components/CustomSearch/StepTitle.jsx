import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";

import "./StepTitle.css";

const stepTitle = {
  marginBottom: '0.5em',
  display: 'flex'
};

export default function StepTitle({ step, state, text }) {
  let icon;
  switch (state) {
    case "active":
      icon = <LoadingOutlined className="stepIcon stepIconActive" />;
      break;
    case "error":
      icon = <WarningOutlined className="stepIcon stepIconError" />;
      break;
    case "pending":
      icon = <Avatar size={24} className="stepIcon">{step}</Avatar>;
      break;
    case "complete":
      icon = (
        <Avatar size={24} className="stepIcon stepIconComplete">
          {step}
        </Avatar>
      );
      break;
    default:
      // pending
      icon = <Avatar size={24}>{step}</Avatar>;
  }

  return (
    <div style={stepTitle}>
      {icon} {text}
    </div>
  );
}

StepTitle.propTypes = {
  step: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};
