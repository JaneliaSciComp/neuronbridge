import React from "react";
import { MemoryRouter } from "react-router";
import MatchModal from "./MatchModal";
import { MatchesProvider } from "../containers/MatchesContext";
import { AppContext } from "../containers/AppContext";

export default {
  title: "MatchModal",
  component: MatchModal,
};

function Template(args) {
  return (
    <MemoryRouter>
      <AppContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          appState: {
            compactMeta: false,
            comparisonCount: {
              pppm: 2,
              cdm: 2,
            },
            imageChoices: {
              pppm: {},
              cdm: {},
            },
            dataConfig: {
              loaded: true,
            },
          },
        }}
      >
        <MatchesProvider>
          <MatchModal {...args} />
        </MatchesProvider>
      </AppContext.Provider>
    </MemoryRouter>
  );
}

export const FirstStory = Template.bind({});

FirstStory.args = {
  open: 1,
  setOpen: () => {
    console.log("setting open");
  },
  isLM: true,
  searchAlgorithm: "pppm",
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
      CDM: "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/12288-JRC2018_VNC_Unisex_40x_DS-CDM.png",
      CDSResults: "2988247185125302403.json",
      store: "fl:pre_release:vnc",
    },
    type: "EMImage",
    precomputed: true,
    maskImageStack: null,
  },
  matchesList: [
    {
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
          CDM: "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/VT063303-20170929_61_G2-GAL4-f-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_3.png",
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
  ],
};
