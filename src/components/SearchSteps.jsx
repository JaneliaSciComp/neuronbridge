import React from "react";
import PropTypes from "prop-types";
import { Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./SearchSteps.css";

const { Step } = Steps;

export default function SearchSteps({ search }) {
  const { error } = search;

  // there are 5 steps in the process stored in the databsae, but we
  // only display 3 in this component, so need this replaces 2 of them
  // with the step that we want to show.
  let currentStep = 0;
  switch (search.step) {
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

  let alignmentStep = <Step title="Image Alignment" />;
  if (search.step === 1) {
    alignmentStep =  <Step icon={<LoadingOutlined />} title="Image Alignment" />;
  }

  let depthSearchStep = <Step title="Color Depth Search" />;
  if (search.step === 3) {
    depthSearchStep = <Step icon={<LoadingOutlined />} title="Color Depth Search" />;
  }

  return (
    <div className="searchSteps">
      <Steps size="small" current={currentStep} status={error}>
        <Step title="Files Uploaded" />
        {alignmentStep}
        {depthSearchStep}
        <Step title="Complete" />
      </Steps>
    </div>
  );
}

SearchSteps.propTypes = {
  search: PropTypes.object.isRequired
};
