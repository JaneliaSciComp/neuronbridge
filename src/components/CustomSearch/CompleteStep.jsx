import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StepTitle from "./StepTitle";

export default function CompleteStep({ state, matches, resultsUrl }) {
  let content = "";
  if (["complete"].includes(state)) {
    content = (
      <>
        <Link
          to={resultsUrl}
          style={{
            display: "block",
            textWrap: "none",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {matches} matches found
        </Link>
        <Link
          to={resultsUrl}
          className="ant-btn css-dev-only-do-not-override-1xqlast ant-btn-primary"
          style={{ width: "150px", marginTop: "0.5em" }}
        >
          View
        </Link>
      </>
    );
  }

  return (
    <>
      <StepTitle state={state} step={5} text="Complete" />
      {content}
    </>
  );
}

CompleteStep.propTypes = {
  state: PropTypes.string.isRequired,
  matches: PropTypes.number,
  resultsUrl: PropTypes.string.isRequired
};

CompleteStep.defaultProps = {
  matches: 0
};
