import React from "react";
import PropTypes from "prop-types";
import { Steps } from "antd";
import "./SearchSteps.css";

const { Step } = Steps;

function getSteps() {
  return ["Files Uploaded", "Image Alignment", "Searching", "Complete"];
}

export default function SearchSteps({ search }) {
  const steps = getSteps();
  const { error } = search;

  // there are 5 steps in the process stored in the databsae, but we
  // only display 3 in this component, so need this replaces 2 of them
  // with the step that we want to show.
  let currentStep = 0;
  switch(search.step) {
    case 2:
      currentStep = 1;
      break;
    case 3:
    case 4:
      currentStep = 2;
      break;
    default:
      currentStep = search.step;
  }

  return (
    <div className="searchSteps">
        <Steps size="small" current={currentStep} status={error}>
          {steps.map(label => {
            return <Step key={label} title={label} />;
          })}
        </Steps>
    </div>
  );
}

SearchSteps.propTypes = {
  search: PropTypes.object.isRequired
};
