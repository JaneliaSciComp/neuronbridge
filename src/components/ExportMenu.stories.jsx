import React from "react";
import { MemoryRouter } from "react-router";
import ExportMenu from "./ExportMenu";
import { MatchesProvider } from "../containers/MatchesContext";

export default {
  title: "ExportMenu",
  component: ExportMenu,
};

function Template(args) {
  return (
    <MemoryRouter>
      <MatchesProvider>
        <ExportMenu {...args} />
      </MatchesProvider>
    </MemoryRouter>
  );
}

const result = {
  mirrored: false,
  normalizedScore: 2941.8447,
  matchingPixels: 19,
  image: {
    libraryName: "FlyEM_Hemibrain_v1.2.1",
    alignmentSpace: "JRC2018_Unisex_20x_HR",
    anatomicalArea: "Brain",
    gender: "f",
    id: "2945073144027205643",
    publishedName: "hemibrain:v1.2.1:2338031784",
    files: {
      store: "fl:open_data:brain",
      CDMThumbnail:
        "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.2.1/2338031784-JRC2018_Unisex_20x_HR-CDM.jpg",
      AlignedBodySWC:
        "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.2.1/SWC/2338031784.swc",
      CDM: "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.2.1/2338031784-JRC2018_Unisex_20x_HR-CDM.png",
      PPPMResults: "2941779886043300386.json",
      CDSResults: "2945073144027205643.json",
      AlignedBodyOBJ:
        "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.2.1/OBJ/2338031784.obj",
    },
    type: "EMImage",
  },
  files: {
    store: "fl:open_data:brain",
    CDMInput:
      "JRC2018_Unisex_20x_HR/FlyLight_Split-GAL4_Drivers/searchable_neurons/pngs/SS39036-20181121_43_C6-Split_GAL4-f-20x-brain-JRC2018_Unisex_20x_HR-CDM_1-01.png",
    CDMMatch:
      "JRC2018_Unisex_20x_HR/FlyEM_Hemibrain_v1.2.1/searchable_neurons/pngs/2338031784-JRC2018_Unisex_20x_HR-CDM.png",
  },
  type: "CDSMatch",
};

export const DownloadSingleImage = Template.bind({});

DownloadSingleImage.args = {
  results: [result],
  searchType: "skeleton",
  searchId: "37d4bcad-70db-42ea-9cb8-25ca5842cd08",
};

export const DownloadThreehundredImages = Template.bind({});

DownloadThreehundredImages.args = {
  searchType: "skeleton",
  searchId: "37d4bcad-70db-42ea-9cb8-25ca5842cd08",
};

DownloadThreehundredImages.args.results = new Array(300).fill(result);
