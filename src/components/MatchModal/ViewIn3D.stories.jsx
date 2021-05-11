import React from "react";
import ViewIn3D from "./ViewIn3D";

import "antd/dist/antd.less";

export default {
  title: "ViewIn3D",
  component: ViewIn3D
};

const Template = args => <ViewIn3D {...args} />;

export const CustomSearch = Template.bind({});

CustomSearch.args = {
  selectedMatch: {
    maskImageName:
      "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
    imageURL:
      "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
    thumbnailURL:
      "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
    id:
      "LH1293-20160518_31_G3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-03",
    libraryName: "FlyLight_Split-GAL4_Drivers",
    publishedName: "LH1293",
    imageName:
      "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/41/LH1293-20160518_31_G3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-03.tif",
    slideCode: "20160518_31_G3",
    objective: "63x",
    gender: "f",
    anatomicalArea: "brain",
    alignmentSpace: "JRC2018_Unisex_20x_HR",
    channel: "2",
    matchingPixels: 1172,
    matchingRatio: 0.041751273556339286,
    gradientAreaGap: -1,
    normalizedScore: 1172,
    position: 2
  },
  mask: {
    id: "938b3b16-d45c-4095-8750-90debf2bd51c",
    owner: "3a3bf91e-d063-4e3f-8cb8-aa6f07dc1c71",
    identityId: "us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64",
    upload:
      "LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
    searchDir: "f03debd0-acda-11eb-9897-d7acfcaf8837",
    searchMask:
      "LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
    errorMessage: null,
    step: 4,
    anatomicalRegion: null,
    algorithm: null,
    searchType: "em2lm",
    precomputed: false,
    displayableMask:
      "LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
    uploadThumbnail: "upload_thumbnail.png",
    nTotalMatches: 27,
    updatedOn: "2021-05-04T13:18:58.915Z",
    createdOn: "2021-05-04T13:16:52.663Z",
    thumbnailURL:
      "https://janelia-neuronbridge-searches-dev.s3.us-east-1.amazonaws.com/private/us-east-1%3Abdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA3KGBN3EJ7MQC5KGB%2F20210511%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210511T132047Z&X-Amz-Expires=500&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLWVhc3QtMSJ...",
    imageURL:
      "https://janelia-neuronbridge-searches-dev.s3.us-east-1.amazonaws.com/private/us-east-1%3Abdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA3KGBN3EJ7MQC5KGB%2F20210511%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210511T132047Z&X-Amz-Expires=500&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLWVhc3QtMSJ..."
  }
};

export const Precomputed = Template.bind({});

Precomputed.args = {
  selectedMatch: {
    id: "2711776942054440971",
    publishedName: "VT015165",
    libraryName: "FlyLight Gen1 MCFO",
    imageURL:
      "https://s3.amazonaws.com/janelia-flylight-color-depth/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT015165-20180831_63_F4-GAL4-f-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
    thumbnailURL:
      "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT015165-20180831_63_F4-GAL4-f-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
    slideCode: "20180831_63_F4",
    objective: "40x",
    gender: "f",
    anatomicalArea: "Brain",
    alignmentSpace: "JRC2018_Unisex_20x_HR",
    channel: "2",
    mountingProtocol: "DPX PBS Mounting",
    matchingPixels: 138,
    matchingRatio: 0.03314917127071823,
    gradientAreaGap: 295,
    normalizedGapScore: 21732.503196293474,
    normalizedScore: 21732.503196293474,
    position: 2
  },
  mask: {
    id: "2820604076100681739",
    publishedName: "1077847238",
    libraryName: "FlyEM_Hemibrain_v1.1",
    precomputed: true,
    imageURL:
      "https://s3.amazonaws.com/janelia-flylight-color-depth/JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.1/1077847238-TC-JRC2018_Unisex_20x_HR-CDM.png",
    thumbnailURL:
      "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails/JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.1/1077847238-TC-JRC2018_Unisex_20x_HR-CDM.jpg",
    gender: "f"
  }
};
