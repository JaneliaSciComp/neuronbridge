import React from "react";
import { MemoryRouter } from "react-router";
import SearchSteps from "./SearchSteps";

export default {
  title: "SearchSteps",
  component: SearchSteps,
};

function Template(args) {
  return (
    <MemoryRouter>
      <SearchSteps {...args} />
    </MemoryRouter>
  );
}

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
    step: 0,
  },
};

export const StepOne = Template.bind({});
StepOne.args = {
  search: {
    errorMessage: null,
    step: 1,
  },
};

export const MaskSelectionStep = Template.bind({});
MaskSelectionStep.args = {
  search: {
    errorMessage: null,
    step: 2,
  },
};

export const LoadingMaskSelectionStep = Template.bind({});
LoadingMaskSelectionStep.args = {
  search: {
    errorMessage: null,
    searchMask: "1110173824_TC_18U_1_mask.png",
    step: 2,
  },
};

export const StepThree = Template.bind({});
StepThree.args = {
  search: {
    errorMessage: null,
    step: 3,
    alignmentScore: 1.234,
    searchDir: "930cb1b0-0d8b-11eb-a9e7-211b7e6bb497",
    alignmentMovie: "alignmentMovie.mp4",
  },
};

export const CompleteStep = Template.bind({});
CompleteStep.args = {
  search: {
    errorMessage: null,
    cdsFinished: "2020-10-13T19:43:52.348Z",
    nTotalMatches: 9,
    step: 5,
  },
};

export const StepTwoErr = Template.bind({});
StepTwoErr.args = {
  search: {
    id: "a5c16107-bf30-4217-8ac1-53c38e356f9f",
    searchDir: "1640add0-30ee-11ec-bb96-a70746ee5819",
    updatedOn: "2021-10-19T15:17:16.754Z",
    anatomicalRegion: "brain",
    dataThreshold: 100,
    simulateMIPGeneration: false,
    alignStarted: "2021-10-19T15:07:12.627Z",
    maskThreshold: 100,
    alignmentSize: 1,
    upload: "1110173824_TC_18U.png",
    identityId: "us-east-1:fa7ca00c-9ffc-426c-ad55-2c05b0f4a4d2",
    step: 1,
    xyShift: 2,
    alignmentErrorMessage: "There are no signal channels",
    pixColorFluctuation: 2,
    mirrorMask: true,
    createdOn: "2021-10-19T15:07:11.030Z",
    maxResultsPerMask: -1,
    errorMessage: "Alignment job failed",
    owner: "f1b44154-26d1-4f77-a8af-11319eb87177",
    minMatchingPixRatio: 2,
    alignFinished: "2021-10-19T15:17:16.167Z",
  },
};

export const IncorrectUpload = Template.bind({});
IncorrectUpload.args = {
  search: {
    id: "a5c16107-bf30-4217-8ac1-53c38e356f9f",
    searchDir: "1640add0-30ee-11ec-bb96-a70746ee5819",
    updatedOn: "2021-10-19T15:17:16.754Z",
    anatomicalRegion: "brain",
    dataThreshold: 100,
    simulateMIPGeneration: false,
    maskThreshold: 100,
    upload: "1110173824_TC_18U.czi",
    identityId: "us-east-1:fa7ca00c-9ffc-426c-ad55-2c05b0f4a4d2",
    step: 1,
    pixColorFluctuation: 2,
    mirrorMask: true,
    createdOn: "2021-10-19T15:07:11.030Z",
    maxResultsPerMask: -1,
    errorMessage: "Alignment job failed",
    owner: "f1b44154-26d1-4f77-a8af-11319eb87177",
    minMatchingPixRatio: 2,
  },
};

export const StepOneErr = Template.bind({});
StepOneErr.args = {
  search: {
    errorMessage: "failed",
    step: 0,
  },
};

export const StepOneBeforeAlignmentWithLSM = Template.bind({});
StepOneBeforeAlignmentWithLSM.args = {
  search: {
    id: "dc6d4ca1-7eb5-4592-852d-7302ce9a46e0",
    upload: "foo.lsm",
    uploadThumbnail: null,
    identityId: "us-east-1:dd0c82e0-a58a-4a0d-be4a-c46d43c864b5",
    searchDir: "3fefb3e0-718b-11ed-9706-7b208de2dd2d",
    searchMask: null,
    searchType: null,
    errorMessage: null,
    displayableMask: null,
    nTotalMatches: null,
    step: 0,
    updatedOn: "2022-12-01T15:22:04.490Z",
    createdOn: "2022-12-01T15:22:04.490Z",
    anatomicalRegion: "brain",
    alignmentScore: null,
    alignmentMovie: null,
    alignStarted: null,
    alignFinished: null,
  },
};

export const StepOneAfterAlignmentWithLSM = Template.bind({});
StepOneAfterAlignmentWithLSM.args = {
  search: {
    id: "dc6d4ca1-7eb5-4592-852d-7302ce9a46e0",
    upload: "foo.lsm",
    uploadThumbnail: null,
    identityId: "us-east-1:dd0c82e0-a58a-4a0d-be4a-c46d43c864b5",
    searchDir: "3fefb3e0-718b-11ed-9706-7b208de2dd2d",
    searchType: null,
    searchMask: null,
    cdsStarted: null,
    cdsFinished: null,
    errorMessage: null,
    displayableMask: null,
    nTotalMatches: null,
    step: 1,
    updatedOn: "2022-12-01T15:22:07.312Z",
    createdOn: "2022-12-01T15:22:04.490Z",
    anatomicalRegion: "brain",
    alignmentScore: null,
    alignmentMovie: null,
    alignFinished: null,
    alignStarted: "2022-12-01T15:22:07.092Z",
  },
};

export const CompleteStepWithErrors = Template.bind({});
CompleteStepWithErrors.args = {
  search: {
    errorMessage: "It went badly, like really badly, there was a lot of smoke and some of the servers will never recover. I don't think they are going to bring the data center back online for months",
    nTotalMatches: 0,
    step: 4,
  },
};


