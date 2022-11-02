import * as React from "react";
import { render, wait } from "@testing-library/react";
import ViewIn3DButton from "../MatchModal/ViewIn3DButton";

describe("View In 3D button: unit tests", () => {
  it("generates the correct url when rendered for EM2LM", async () => {
    const match = {
      mirrored: false,
      normalizedScore: 2414.1199,
      matchingPixels: 538,
      image: {
        libraryName: "FlyLight Gen1 MCFO",
        alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
        anatomicalArea: "VNC",
        gender: "m",
        slideCode: "20200124_62_G3",
        objective: "40x",
        mountingProtocol: "DPX PBS Mounting",
        channel: 2,
        id: "2770622423236608011",
        publishedName: "VT017683",
        files: {
          CDMThumbnail:
            "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/VT017683-20200124_62_G3-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_2.jpg",
          CDM: "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/VT017683-20200124_62_G3-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_2.png",
          CDSResults: "2770622423236608011.json",
          store: "fl:pre_release:vnc",
          VisuallyLosslessStack:
            "https://s3.amazonaws.com/janelia-flylight-imagery/Gen1+MCFO/VT017683/VT017683-20200124_62_G3-m-40x-vnc-GAL4-JRC2018_VNC_Unisex-aligned_stack.h5j",
        },
        type: "LMImage",
      },
      files: {
        CDMMatch:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/searchable_neurons/pngs/VT017683-20200124_62_G3-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_2-01.png",
        CDMInput:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/searchable_neurons/pngs/11261-JRC2018_VNC_Unisex_40x_DS-CDM.png",
        store: "fl:pre_release:vnc",
      },
      type: "CDSMatch",
      anatomicalArea: "VNC",
      position: 2,
    };
    const mask = {
      libraryName: "FlyEM_VNC_v0.6",
      alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
      anatomicalArea: "VNC",
      gender: "m",
      neuronInstance: "11261_R",
      id: "2988247182491414659",
      publishedName: "vnc:v0.6:11261",
      files: {
        CDMThumbnail:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/11261-JRC2018_VNC_Unisex_40x_DS-CDM.jpg",
        CDM: "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/11261-JRC2018_VNC_Unisex_40x_DS-CDM.png",
        CDSResults: "2988247182491414659.json",
        store: "fl:pre_release:vnc",
      },
      type: "EMImage",
      precomputed: true,
      maskImageStack: null,
    };
    const { container } = render(
      <ViewIn3DButton isLM match={match} mask={mask} />
    );
    await wait();
    const link = container.querySelector("a");
    expect(link.href).toBe(
      "https://neuronbridge-vol-viewer.janelia.org/?ref=http%3A%2F%2Flocalhost%2F&h5j=https%3A%2F%2Fs3.amazonaws.com%2Fjanelia-flylight-imagery%2FGen1%2BMCFO%2FVT017683%2FVT017683-20200124_62_G3-m-40x-vnc-GAL4-JRC2018_VNC_Unisex-aligned_stack.h5j&swc=undefined&ch=2&mx=false"
    );
  });
  it("generates the correct url when rendered for LM2EM", async () => {
    const match = {
      mirrored: false,
      normalizedScore: 22114.502,
      matchingPixels: 516,
      image: {
        libraryName: "FlyEM_VNC_v0.6",
        alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
        anatomicalArea: "VNC",
        gender: "m",
        neuronType: "pct_12755",
        neuronInstance: "12755_R",
        id: "2988247187660406915",
        publishedName: "vnc:v0.6:12755",
        files: {
          store: "fl:pre_release:vnc",
          CDSResults: "2988247187660406915.json",
          CDMThumbnail:
            "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/12755-JRC2018_VNC_Unisex_40x_DS-CDM.jpg",
          CDM: "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/12755-JRC2018_VNC_Unisex_40x_DS-CDM.png",
        },
        type: "EMImage",
      },
      files: {
        store: "fl:pre_release:vnc",
        CDMInput:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/searchable_neurons/pngs/R33C10-20190816_62_G3-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_1-02.png",
        CDMMatch:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyEM_VNC_v0.6/searchable_neurons/pngs/12755-JRC2018_VNC_Unisex_40x_DS-CDM.png",
      },
      type: "CDSMatch",
      anatomicalArea: "VNC",
      position: 2,
    };
    const mask = {
      libraryName: "FlyLight Gen1 MCFO",
      alignmentSpace: "JRC2018_VNC_Unisex_40x_DS",
      anatomicalArea: "VNC",
      gender: "m",
      slideCode: "20190816_62_G3",
      objective: "40x",
      mountingProtocol: "DPX PBS Mounting",
      channel: 1,
      id: "2711773337264062475",
      publishedName: "R33C10",
      files: {
        store: "fl:pre_release:vnc",
        CDSResults: "2711773337264062475.json",
        CDMThumbnail:
          "https://s3.amazonaws.com/janelia-flylight-color-depth-thumbnails-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/R33C10-20190816_62_G3-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_1.jpg",
        VisuallyLosslessStack:
          "https://s3.amazonaws.com/janelia-flylight-imagery/Gen1+MCFO/R33C10/R33C10-20190816_62_G3-m-40x-vnc-GAL4-JRC2018_VNC_Unisex-aligned_stack.h5j",
        Gal4Expression:
          "https://s3.amazonaws.com/janelia-flylight-imagery/Gen1/CDM/R33C10/R33C10-20081204_01_fA01v_20081204150358790-f-20x-ventral_nerve_cord-JRC2018_VNC_Unisex_40x_DS-CDM_1.png",
        CDM: "https://s3.amazonaws.com/janelia-flylight-color-depth-devpre/JRC2018_VNC_Unisex_40x_DS/FlyLight_Gen1_MCFO/R33C10-20190816_62_G3-GAL4-m-40x-vnc-JRC2018_VNC_Unisex_40x_DS-CDM_1.png",
      },
      type: "LMImage",
      precomputed: true,
      maskImageStack: null,
    };
    const { container } = render(
      <ViewIn3DButton match={match} mask={mask} />
    );
    await wait();
    const link = container.querySelector("a");
    expect(link.href).toBe("https://neuronbridge-vol-viewer.janelia.org/?ref=http%3A%2F%2Flocalhost%2F&h5j=https%3A%2F%2Fs3.amazonaws.com%2Fjanelia-flylight-imagery%2FGen1%2BMCFO%2FR33C10%2FR33C10-20190816_62_G3-m-40x-vnc-GAL4-JRC2018_VNC_Unisex-aligned_stack.h5j&swc=undefined&ch=1&mx=false");
  });
});
