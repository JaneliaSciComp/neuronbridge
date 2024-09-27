import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";
import StepTitle from "./StepTitle";

const { Text } = Typography;

export default function CompleteStep({ state, matches, resultsUrl, errorMessage }) {
  let content = "";

  const handleView = () => {
    if (Object.prototype.hasOwnProperty.call(window, 'fathom')) {
    // make sure the fathom code has been loaded and not blocked by an ad blocker.
      if (window.fathom) {
        window.fathom.trackGoal('view complete results', 0);
      }
    }
  };

  if (state === "error" || (errorMessage && !matches)) {
    content = (
      <Text type="danger">{errorMessage}</Text>
    );
  }
  else if (["complete"].includes(state)) {
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
      <Button type="primary" style={{ width: "150px", marginTop: "0.5em" }} onClick={handleView}>
          <Link to={resultsUrl} >
            View
          </Link>
        </Button>
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
  resultsUrl: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
};

CompleteStep.defaultProps = {
  matches: 0,
  errorMessage: ""
};
