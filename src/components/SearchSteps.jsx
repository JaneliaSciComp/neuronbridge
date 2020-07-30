import React from "react";
import PropTypes from "prop-types";
import { Steps } from 'antd';

const {Step} = Steps;

function getSteps() {
  return ["Files Uploaded", "Alignment", "Search", "Complete"];
}

export default function SearchSteps({ search }) {
  const steps = getSteps();
  const { error } = search;

  return (
    <div>
        <Steps current={search.step} status={error}>
          {steps.map(label => {
            return (
              <Step key={label} title={label} />
            );
          })}
        </Steps>
    </div>
  );
}

SearchSteps.propTypes = {
  search: PropTypes.object.isRequired
};
