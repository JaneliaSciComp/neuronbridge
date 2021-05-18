import React from "react";
import Matches from "./Matches";
import { MatchesProvider } from "../containers/MatchesContext";

import "antd/dist/antd.less";

export default {
  title: "Matches",
  component: Matches
};

const Template = args => (
  <MatchesProvider>
    <Matches {...args} />
  </MatchesProvider>
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  input: {
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
    displayableMask:
      "LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
    uploadThumbnail: "upload_thumbnail.png",
    nTotalMatches: 27,
    updatedOn: "2021-05-04T13:18:58.915Z",
    createdOn: "2021-05-04T13:16:52.663Z",
    voxelX: null,
    voxelY: null,
    voxelZ: null,
    referenceChannel: null,
    alignStarted: null,
    alignFinished: null,
    thumbnailURL:
      "https://janelia-neuronbridge-searches-dev.s3.us-east-1.amazonaws.com/private/us-east-1%3Abdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA3KGBN3EJ5BDGZUGX%2F20210518%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210518T203234Z&X-Amz-Expires=500&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%...",
    imageURL:
      "https://janelia-neuronbridge-searches-dev.s3.us-east-1.amazonaws.com/private/us-east-1%3Abdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA3KGBN3EJ5BDGZUGX%2F20210518%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210518T203234Z&X-Amz-Expires=500&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM3%2F%2F%2F%2F%2F%...",
    precomputed: false
  },
  matches: {
    maskId:
      "LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask",
    maskPublishedName: null,
    maskLibraryName: null,
    maskImageURL:
      "https://s3.amazonaws.com/janelia-neuronbridge-searches-dev/private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
    results: [
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH173",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/18/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20150123_41_A2",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 4069,
        matchingRatio: 0.14495386698015747,
        gradientAreaGap: -1,
        normalizedScore: 4069,
        position: 1
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-02",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH173",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/18/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-02.tif",
        slideCode: "20150123_41_A2",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 4051,
        matchingRatio: 0.1443126358163229,
        gradientAreaGap: -1,
        normalizedScore: 4051
      },
      {
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
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D4-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D4-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "LH173-20150821_31_D4-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-05",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH173",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/30/LH173-20150821_31_D4-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-05.tif",
        slideCode: "20150821_31_D4",
        objective: "63x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 1043,
        matchingRatio: 0.037155783548858255,
        gradientAreaGap: -1,
        normalizedScore: 1043
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G2-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G2-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "LH1293-20160518_31_G2-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-03",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH1293",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/41/LH1293-20160518_31_G2-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-03.tif",
        slideCode: "20160518_31_G2",
        objective: "63x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 864,
        matchingRatio: 0.030779095864058994,
        gradientAreaGap: -1,
        normalizedScore: 864
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH849-20150828_31_F3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH849-20150828_31_F3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "LH849-20150828_31_F3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-06",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH849",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/30/LH849-20150828_31_F3-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-06.tif",
        slideCode: "20150828_31_F3",
        objective: "63x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 752,
        matchingRatio: 0.02678921306686616,
        gradientAreaGap: -1,
        normalizedScore: 752,
        position: 3
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-02",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH1293",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/66/LH1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-02.tif",
        slideCode: "20160518_31_G2",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 744,
        matchingRatio: 0.026504221438495245,
        gradientAreaGap: -1,
        normalizedScore: 744
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1574-20180313_31_B6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1574-20180313_31_B6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH1574-20180313_31_B6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-05",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH1574",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/66/LH1574-20180313_31_B6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-05.tif",
        slideCode: "20180313_31_B6",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 743,
        matchingRatio: 0.02646859748494888,
        gradientAreaGap: -1,
        normalizedScore: 743,
        position: 4
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1828-20150227_41_C6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1828-20150227_41_C6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH1828-20150227_41_C6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH1828",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/18/LH1828-20150227_41_C6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20150227_41_C6",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 741,
        matchingRatio: 0.02639734957785615,
        gradientAreaGap: -1,
        normalizedScore: 741,
        position: 5
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1129-20150929_33_F1-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1129-20150929_33_F1-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "LH1129-20150929_33_F1-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-02",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH1129",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/39/LH1129-20150929_33_F1-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-02.tif",
        slideCode: "20150929_33_F1",
        objective: "63x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 739,
        matchingRatio: 0.02632610167076342,
        gradientAreaGap: -1,
        normalizedScore: 739,
        position: 6
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1284-20151007_31_A1-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1284-20151007_31_A1-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH1284-20151007_31_A1-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-07",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH1284",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/63/LH1284-20151007_31_A1-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-07.tif",
        slideCode: "20151007_31_A1",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 716,
        matchingRatio: 0.025506750739197035,
        gradientAreaGap: -1,
        normalizedScore: 716,
        position: 7
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH173-20150821_31_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-06",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH173",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/59/LH173-20150821_31_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-06.tif",
        slideCode: "20150821_31_D4",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 715,
        matchingRatio: 0.025471126785650673,
        gradientAreaGap: -1,
        normalizedScore: 715
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D5-Split_GAL4--20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH173-20150821_31_D5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-06",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH173",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Spli-GAL4_Drivers/searchable_neurons/59/LH173-20150821_31_D5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-06.tif",
        slideCode: "20150821_31_D5",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 710,
        matchingRatio: 0.02529300701791885,
        gradientAreaGap: -1,
        normalizedScore: 710
      },
      {
        maskImageName:
          "privae/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH849-20150828_31_F1-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH849-20150828_31_F1-Split_GAL4-f-63x-brain-JC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "LH849-20150828_31_F1-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-03",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH849",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/30/LH849-20150828_31_F1-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-03.tif",
        slideCode: "20150828_31_F1",
        objective: "63x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 709,
        mathingRatio: 0.025257383064372484,
        gradientAreaGap: -1,
        normalizedScore: 709
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylightcolor-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1284-20151007_31_A5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1284-20151007_31_A5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH1284-20151007_31_A5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-08",
        libraryName: "FlyLight_Split-GAL4Drivers",
        publishedName: "LH1284",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/63/LH1284-20151007_31_A5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-08.tif",
        slideCode: "20151007_31_A5",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 671,
        matchingRatio: 0.02390367282961063,
        gradientAreaGap: -1,
        normalizedScore: 671
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT063305-20170727_62_A2-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT063305-20170727_62_A2-GL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "VT063305-20170727_62_A2-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2-01",
        libraryName: "FlyLight_Gen1_MCFO",
        publishedName: "VT063305",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/searchable_neurons/194/VT063305-20170727_62_A2-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2-01.tif",
        slideCode: "20170727_62_A2",
        objective: "40x",
        gender: "m",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 645,
        matchingRatio: 0.022977450037405152,
        gradientAreaGap: -1,
        normalizedScore: 645,
        position: 8
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.om/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH2033-20160629_31_E6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH2033-20160629_31_E6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH2033-20160629_31_E6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH2033",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/69/LH2033-20160629_31_E6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20160629_31_E6",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 617,
        matchingRatio: 0.021979979338106942,
        gradientAreaGap: -1,
        normalizedScore: 617,
        position: 9
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331af0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D5-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D5-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "LH173-20150821_31_D5-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-07",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH173",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/30/LH173-20150821_31_D5-Split_GAL4-f-63x-brain-JRC2018_Unisex_20x_HR-CDM_2-07.tif",
        slideCode: "20150821_31_D5",
        objective: "63x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC201_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 611,
        matchingRatio: 0.021766235616828757,
        gradientAreaGap: -1,
        normalizedScore: 611
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlLight_Gen1_MCFO/R39H01-20190305_62_I1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/R39H01-20190305_62_I1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "R39H01-20190305_62_I1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Gen1_MCFO",
        publishedName: "R39H01",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/searchable_neurons/1319/R39H01-20190305_2_I1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20190305_62_I1",
        objective: "40x",
        gender: "m",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 599,
        matchingRatio: 0.021338748174272382,
        gradientAreaGap: -1,
        normalizedScore: 599,
        position: 10
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_31_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH173-20150821_1_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH173-20150821_31_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-05",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH173",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/59/LH173-20150821_31_D4-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-05.tif",
        slideCode: "20150821_31_D4",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matcingPixels: 594,
        matchingRatio: 0.02116062840654056,
        gradientAreaGap: -1,
        normalizedScore: 594
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH2033-20160629_31_F6-Split_GA4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH2033-20160629_31_F6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH2033-20160629_31_F6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH2033",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/69/LH2033-20160629_31_F-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20160629_31_F6",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 585,
        matchingRatio: 0.020840012824623277,
        gradientAreaGap: -1,
        normalizedScore: 585
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03ded0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/R19A04-20181204_63_F5-GAL4-f-40x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/R19A04-20181204_63_F5-GAL4-f-40x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "R19A04-20181204_63_F5-GAL4-f-40x-brin-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Gen1_MCFO",
        publishedName: "R19A04",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/searchable_neurons/1111/R19A04-20181204_63_F5-GAL4-f-40x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20181204_63_F5",
        objective: "40x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unsex_20x_HR",
        channel: "1",
        matchingPixels: 580,
        matchingRatio: 0.020661893056891454,
        gradientAreaGap: -1,
        normalizedScore: 580,
        position: 11
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC218_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT007393-20180522_61_B1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT007393-20180522_61_B1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
        id:
          "VT007393-20180522_61_B1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2-01",
        libraryName: "FlyLight_Gen1_MCFO",
        publishedName: "VT007393",
        imaeName:
          "JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/searchable_neurons/651/VT007393-20180522_61_B1-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2-01.tif",
        slideCode: "20180522_61_B1",
        objective: "40x",
        gender: "m",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "2",
        matchingPixels: 576,
        matchingRatio: 0.020519397242705996,
        gradientAreaGap: -1,
        normalizedScore: 576,
        postion: 12
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH166-20150706_31_D5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-olor-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH166-20150706_31_D5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH166-20150706_31_D5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH166",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/64/LH166-20150706_31_D5-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20150706_31_D5",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 575,
        matchingRatio: 0.02048377328915963,
        gradientAreaGap: -1,
        normalizedScore: 575,
        position: 13
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH73-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH185-20160427_32_E3-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH185-20160427_32_E3-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "LH185-20160427_32_E3-Split_GAL4-f-20x-bran-JRC2018_Unisex_20x_HR-CDM_1-04",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH185",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/64/LH185-20160427_32_E3-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-04.tif",
        slideCode: "20160427_32_E3",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 568,
        matchingRatio: 0.0202344056133508,
        gradientAreaGap: -1,
        normalizedScore: 568,
        position: 14
      },
      {
        maskImageName:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT03240920170623_61_B5-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/VT032409-20170623_61_B5-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "VT032409-20170623_61_B5-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1-01",
        libraryName: "FlyLight_Gen1_MCFO",
        publishedName: "VT032409",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/searchable_neurons/48/VT032409-20170623_61_B5-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.tif",
        slideCode: "20170623_61_B5",
        objective: "40x",
        gender: "m",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 566,
        matchingRatio: 0.02016315770724235,
        gradientAreaGap: -1,
        normalizedScore: 566,
        position: 15
      },
      {
        maskImageNme:
          "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/f03debd0-acda-11eb-9897-d7acfcaf8837/LH173-20150123_41_A2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1_1_mask.png",
        imageURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.png",
        thumbnailURL:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/LH1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1.jpg",
        id:
          "L1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-03",
        libraryName: "FlyLight_Split-GAL4_Drivers",
        publishedName: "LH1293",
        imageName:
          "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/66/LH1293-20160518_31_G2-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-03.tif",
        slideCode: "20160518_31_G2",
        objective: "20x",
        gender: "f",
        anatomicalArea: "brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR",
        channel: "1",
        matchingPixels: 65,
        matchingRatio: 0.020127533753695984,
        gradientAreaGap: -1,
        normalizedScore: 565
      }
    ]
  },
  searchType: "skeleton",
  precomputed: false
};
