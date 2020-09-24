import React from "react";
import SearchSteps from "./SearchSteps";

import "antd/dist/antd.less";

export default {
  title: 'SearchSteps',
  component: SearchSteps,
};

const Template = (args) => <SearchSteps {...args} />;

export const StepOne = Template.bind({});
StepOne.args = {
  search: {
    errorMessage: null,
    step: 1
  }
};

export const StepTwo = Template.bind({});
StepTwo.args = {
  search: {
    errorMessage: null,
    step: 2
  }
}

export const StepThree = Template.bind({});
StepThree.args = {
  search: {
    errorMessage: null,
    step: 3
  }
}

export const StepFour = Template.bind({});
StepFour.args = {
  search: {
    errorMessage: null,
    step: 5
  }
}

export const StepOneErr = Template.bind({});
StepOneErr.args = {
  search: {
    errorMessage: 'failed',
    step: 0
  }
};


