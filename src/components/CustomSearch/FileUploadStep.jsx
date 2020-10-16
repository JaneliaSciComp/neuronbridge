import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import StepTitle from "./StepTitle";

export default function FileUploadStep({ state, date }) {
  let content = "";
  if (["active", "complete"].includes(state)) {
    if (date) {
      content = `Uploaded ${formatRelative(new Date(date), new Date())}`;
    }
  }

  return (
    <>
      <StepTitle state={state} step={1} text="Files Uploaded" />
      <p style={{ marginTop: "1em" }}>{content}</p>
    </>
  );
}

FileUploadStep.propTypes = {
  state: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
