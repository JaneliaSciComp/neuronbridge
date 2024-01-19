import React from "react";
import { MemoryRouter } from "react-router";
import Download3D from "./Download3D";
import { AppContext } from "../../containers/AppContext";

export default {
  title: "Download3D",
  component: Download3D,
};

function Template(args){
  return (
    <MemoryRouter>
      <AppContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          appState: {
            dataConfig: {
              anatomicalAreas: {
                Brain: {
                  label: "Brain",
                  alignmentSpace: "JRC2018_Unisex_20x_HR",
                },
                VNC: {
                  label: "VNC",
                  alignmentSpace: "JRC2018_Unisex_20x_HR",
                },
              },
            },
          },
        }}
      >
        <Download3D {...args} />;
      </AppContext.Provider>
    </MemoryRouter>
  );
}

export const CustomSearch = Template.bind({});

CustomSearch.args = {
  selectedMatch: {
    image: {
      id: "10465-JRC2018_VNC_Unisex_40x_DS-CDM",
      libraryName: "FlyEM_VNC_v0.6",
      publishedName: "10465",
      alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
      gender: "f",
      anatomicalArea: "VNC",
      type: "EMImage",
      files: {
        store: "fl:pre_release:vnc",
        CDM:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/10465-JRC2018_VNC_Unisex_40x_DS-CDM.png",
        CDMThumbnail:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/10465-JRC2018_VNC_Unisex_40x_DS-CDM.jpg",
      },
    },
    files: {
      store: "fl:pre_release:vnc",
      CDMInput:
        "427f5cf0-4bcf-11ed-b20c-d97d57acfe92/332685751-RT-JRC2018_Unisex_20x_HR-CDM_1_mask.png",
      CDMMatch:
        "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/searchable_neurons/pngs/10465-JRC2018_VNC_Unisex_40x_DS-CDM.png",
    },
    mirrored: false,
    normalizedScore: 64,
    matchingPixels: 64,
    matchingRatio: 0.034206306787814,
    anatomicalArea: "VNC",
    position: 1,
  },
  mask: {
    id: "f4ead72d-6991-427c-a2ea-18c44d8a1460",
    owner: "783df4ec-63f4-4f97-b2eb-65bd0108480d",
    identityId: "us-east-1:dd0c82e0-a58a-4a0d-be4a-c46d43c864b5",
    upload: "332685751-RT-JRC2018_Unisex_20x_HR-CDM.png",
    searchDir: "427f5cf0-4bcf-11ed-b20c-d97d57acfe92",
    searchMask: "332685751-RT-JRC2018_Unisex_20x_HR-CDM_1_mask.png",
    errorMessage: null,
    alignmentErrorMessage: null,
    step: 4,
    anatomicalRegion: "vnc",
    algorithm: null,
    searchType: "lm2em",
    displayableMask: "332685751-RT-JRC2018_Unisex_20x_HR-CDM_1_mask.png",
    uploadThumbnail: "upload_thumbnail.png",
    nTotalMatches: 12,
    updatedOn: "2022-10-14T14:57:13.992Z",
    createdOn: "2022-10-14T14:56:43.725Z",
    voxelX: null,
    voxelY: null,
    voxelZ: null,
    referenceChannel: null,
    alignStarted: null,
    alignFinished: null,
    filename: "332685751-RT-JRC2018_Unisex_20x_HR-CDM_1_mask",
    libraryName: null,
    publishedName: null,
    files: {
      CDM:
        "427f5cf0-4bcf-11ed-b20c-d97d57acfe92/332685751-RT-JRC2018_Unisex_20x_HR-CDM_1_mask.png",
    },
    maskImageStack: null,
  },
};

export const Precomputed = Template.bind({});

Precomputed.args = {
  selectedMatch: {
    mirrored: true,
    normalizedScore: 38547.02,
    matchingPixels: 687,
    image: {
      libraryName: "FlyLight Gen1 MCFO",
      alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
      anatomicalArea: "VNC",
      gender: "f",
      slideCode: "20170929_61_G2",
      objective: "40x",
      mountingProtocol: "DPX PBS Mounting",
      channel: 3,
      id: "2711773553484627979",
      publishedName: "VT063303",
      files: {
        CDMThumbnail:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/VT063303-20170929_61_G2-GAL4-f-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_3.jpg",
        CDM:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/VT063303-20170929_61_G2-GAL4-f-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_3.png",
        CDSResults: "2711773553484627979.json",
        Gal4Expression:
          "undefinedGen1/CDM/VT063303/VT063303-sample_002901-f-20x-ventral_nerve_cord-JRC2018_VNC_Unisex_40x_DS-CDM_1.png",
        store: "fl:pre_release:vnc",
        VisuallyLosslessStack:
          "https://s3.amazonaws.com/janelia-flylight-imagery/Gen1+MCFO/VT063303/VT063303-20170929_61_G2-f-40x-vnc-GAL4-JRC2018_VNC_Unisex-aligned_stack.h5j",
      },
      type: "LMImage",
    },
    files: {
      CDMMatch:
        "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/searchable_neurons/pngs/VT063303-20170929_61_G2-GAL4-f-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_3-01.png",
      CDMInput:
        "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/searchable_neurons/pngs/12288-JRC2018_VNC_Unisex_40x_DS-CDM.png",
      store: "fl:pre_release:vnc",
    },
    type: "CDSMatch",
    anatomicalArea: "VNC",
    position: 1,
  },
  mask: {
    libraryName: "FlyEM_VNC_v0.6",
    alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
    anatomicalArea: "VNC",
    gender: "m",
    neuronInstance: "12288_R",
    id: "2988247185125302403",
    publishedName: "vnc:v0.6:12288",
    files: {
      CDMThumbnail:
        "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/12288-JRC2018_VNC_Unisex_40x_DS-CDM.jpg",
      CDM:
        "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/12288-JRC2018_VNC_Unisex_40x_DS-CDM.png",
      CDSResults: "2988247185125302403.json",
      store: "fl:pre_release:vnc",
    },
    type: "EMImage",
    precomputed: true,
    maskImageStack: null,
  },
};
