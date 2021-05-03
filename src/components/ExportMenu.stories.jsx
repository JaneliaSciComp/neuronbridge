import React from "react";
import ExportMenu from "./ExportMenu";
import { MatchesProvider } from "../containers/MatchesContext";

import "antd/dist/antd.less";

export default {
  title: "ExportMenu",
  component: ExportMenu
};

const Template = args => (
  <MatchesProvider>
    <ExportMenu {...args} />
  </MatchesProvider>
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  results: [
    {
      maskImageName:
        "private/us-east-1:bdf8f247-6f45-4692-ad74-331abf0e1c64/dfed0f50-ac48-11eb-8e55-a1008873a97d/GMR_9B06_AE_01_18-xX00b_C070224_20070414120013978_3_mask.png",
      imageURL:
        "https://s3.amazonaws.com/janelia-flylight-color-depth-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/R49A09-20190319_61_D4-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.png",
      thumbnailURL:
        "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-dev/JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/R49A09-20190319_61_D4-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2.jpg",
      id:
        "R49A09-20190319_61_D4-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2-01",
      libraryName: "FlyLight_Gen1_MCFO",
      publishedName: "R49A09",
      imageName:
        "JRC2018_Unisex_20x_HR/FlyLight_Gen1_MCFO/searchable_neurons/1398/R49A09-20190319_61_D4-GAL4-m-40x-brain-JRC2018_Unisex_20x_HR-CDM_2-01.tif",
      slideCode: "20190319_61_D4",
      objective: "40x",
      gender: "m",
      anatomicalArea: "brain",
      alignmentSpace: "JRC2018_Unisex_20x_HR",
      channel: "2",
      matchingPixels: 178,
      matchingRatio: 0.02218344965104686,
      gradientAreaGap: -1,
      normalizedScore: 178
    }
  ],
  searchType: "skeleton",
  searchId: "37d4bcad-70db-42ea-9cb8-25ca5842cd08"
};
