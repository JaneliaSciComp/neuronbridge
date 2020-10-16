import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import StepTitle from "./StepTitle";

export default function ColorDepthSearchStep({ date, state }) {
  let content = "";
  if (["active", "complete"].includes(state)) {
    if (date) {
      content = `Finished ${formatRelative(new Date(date), new Date())}`;
    }
  }

  return (
    <>
      <StepTitle state={state} step={4} text="Color Depth Search" />
      <p style={{ marginTop: "1em" }}>{content}</p>
    </>
  );
}

ColorDepthSearchStep.propTypes = {
  state: PropTypes.string.isRequired,
  date: PropTypes.string
};

ColorDepthSearchStep.defaultProps = {
  date: null
};
