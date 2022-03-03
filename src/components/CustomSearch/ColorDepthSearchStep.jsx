import React from "react";
import PropTypes from "prop-types";
import { formatRelative, formatDistanceStrict } from "date-fns";
import StepTitle from "./StepTitle";

export default function ColorDepthSearchStep({ started, finished, state }) {
  let searchEnd = "";
  let duration = "";

  if (["active", "complete"].includes(state)) {
    if (finished) {
      duration = `Duration: ${formatDistanceStrict(new Date(finished), new Date(started))}`;
      searchEnd = `Finished ${formatRelative(new Date(finished), new Date())}`;
    }
  }

  return (
    <>
      <StepTitle state={state} step={4} text="Color Depth Search" />
      <p style={{ marginTop: "1em" }}>{searchEnd}</p>
      <p style={{ marginTop: "1em" }}>{duration}</p>
    </>
  );
}

ColorDepthSearchStep.propTypes = {
  state: PropTypes.string.isRequired,
  finished: PropTypes.string,
  started: PropTypes.string,
};

ColorDepthSearchStep.defaultProps = {
  finished: null,
  started: null
};
