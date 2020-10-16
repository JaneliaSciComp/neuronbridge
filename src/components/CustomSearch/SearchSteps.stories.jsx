import React from "react";
import SearchSteps from "./SearchSteps";

import "antd/dist/antd.less";

export default {
  title: 'SearchSteps',
  component: SearchSteps,
};

const Template = (args) => <SearchSteps {...args} />;

export const StepZero = Template.bind({});
StepZero.args = {
  search: {
    cdsFinished: "2020-10-13T19:43:52.348Z",
    cdsStarted: "2020-10-13T19:38:46.136Z",
    createdOn: "2020-10-13T19:38:06.757Z",
    displayableMask: "1110173824_TC_18U_1_mask.png",
    id: "a0498b97-9390-4f8b-9ef5-efd45d119586",
    identityId: "us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64",
    nTotalMatches: 9,
    owner: "3a3bf91e-d063-4e3f-8cb8-aa6f07dc1c71",
    searchDir: "930cb1b0-0d8b-11eb-a9e7-211b7e6bb497",
    searchMask: "1110173824_TC_18U_1_mask.png",
    searchType: "lm2em",
    updatedOn: "2020-10-13T19:43:52.489Z",
    upload: "1110173824_TC_18U.png",
    errorMessage: null,
    step: 0
  }
};

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

export const CompleteStep = Template.bind({});
CompleteStep.args = {
  search: {
    errorMessage: null,
    cdsFinished: "2020-10-13T19:43:52.348Z",
    nTotalMatches: 9,
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


