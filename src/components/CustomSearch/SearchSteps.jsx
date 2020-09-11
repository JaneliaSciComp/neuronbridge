import React from "react";
import PropTypes from "prop-types";
import { Steps } from "antd";
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import "./SearchSteps.css";

const { Step } = Steps;

const steps = [
  "Files Uploaded",
  "Image Alignment",
  "Color Depth Search",
  "Complete"
];

export default function SearchSteps({ search }) {
  const { errorMessage } = search;

  // there are 5 steps in the process stored in the databsae, but we
  // only display 3 in this component, so need this replaces 2 of them
  // with the step that we want to show.
  let currentStep = 0;
  switch (search.step) {
    case 1:
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


  const formattedSteps = steps.map((step, i) => {
    // by default we want to show the spinning loading icon
    // to indicate that something is happening.
    let icon = <LoadingOutlined />;
    // if we are on a step that is waiting for user input, then we need
    // to remove the spinning loader icon. This is after the alignment step
    // before the searchMask has been chosen.
    if (search.step === 2 && !search.searchMask) {
      icon = null;
    }
    if (currentStep === i) {
      // if search has an errorMessage then show error icon for the
      // currently active step
      if (errorMessage) {
        icon = <WarningOutlined />;
      }
      return <Step key={step} icon={icon} title={step} />;
    }
    return <Step key={step} title={step} />;
  });

  let status = "process";
  if (errorMessage) {
    status = "error";
  }

  return (
    <div className="searchSteps">
      <Steps size="small" current={currentStep} status={status}>
        {formattedSteps}
      </Steps>
    </div>
  );
}

SearchSteps.propTypes = {
  search: PropTypes.object.isRequired
};
