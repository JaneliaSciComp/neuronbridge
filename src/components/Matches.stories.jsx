import React from "react";
import Matches from "./Matches";
import { MatchesProvider } from "../containers/MatchesContext";
import { AppContext } from "../containers/AppContext";

export default {
  title: "Matches",
  component: Matches,
};

function Template(args){ 
  return (
    <AppContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        appState: {
          gridView: true,
          showFilterMenu: true,
          dataConfig: {
            loaded: true,
          },
        },
      }}
    >
      <MatchesProvider>
        <Matches {...args} />
      </MatchesProvider>
    </AppContext.Provider>
  );
}

export const FirstStory = Template.bind({});

FirstStory.args = {
  precomputed: true,
  searchAlgorithm: "cdm",
  input: {
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
  },
  matches: {
    inputImage: {
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
    },
    results: [
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
      },
      {
        mirrored: false,
        normalizedScore: 30889.145,
        matchingPixels: 535,
        image: {
          libraryName: "FlyLight Gen1 MCFO",
          alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
          anatomicalArea: "VNC",
          gender: "m",
          slideCode: "20170922_63_H2",
          objective: "40x",
          mountingProtocol: "DPX PBS Mounting",
          channel: 2,
          id: "2711773506487451659",
          publishedName: "VT042475",
          files: {
            CDMThumbnail:
              "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/VT042475-20170922_63_H2-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_2.jpg",
            CDM:
              "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/VT042475-20170922_63_H2-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_2.png",
            CDSResults: "2711773506487451659.json",
            Gal4Expression:
              "undefinedGen1/CDM/VT042475/VT042475-sample_006435-f-20x-ventral_nerve_cord-JRC2018_VNC_Unisex_40x_DS-CDM_1.png",
            store: "fl:pre_release:vnc",
            VisuallyLosslessStack:
              "https://s3.amazonaws.com/janelia-flylight-imagery/Gen1+MCFO/VT042475/VT042475-20170922_63_H2-m-40x-vnc-GAL4-JRC2018_VNC_Unisex-aligned_stack.h5j",
          },
          type: "LMImage",
        },
        files: {
          CDMMatch:
            "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/searchable_neurons/pngs/VT042475-20170922_63_H2-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_2-02.png",
          CDMInput:
            "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/searchable_neurons/pngs/12288-JRC2018_VNC_Unisex_40x_DS-CDM.png",
          store: "fl:pre_release:vnc",
        },
        type: "CDSMatch",
      },
    ],
  },
};
