import React from "react";
import { MemoryRouter } from "react-router";
import MaskDrawing from "./MaskDrawing";

export default {
  title: "MaskDrawing",
  component: MaskDrawing,
};

function Template(args) {
  return (
    <MemoryRouter>
      <MaskDrawing {...args} />
    </MemoryRouter>
  );
}

export const ImageSelected = Template.bind({});

ImageSelected.args = {
  onMaskChange: () => console.log("changed"),
  imgSrc: "/landing_background.png",
  signImage: false,
};

export const NoImageSelected = Template.bind({});

NoImageSelected.args = {
  onMaskChange: () => console.log("changed"),
};

export const ImageSigned = Template.bind({});

ImageSigned.args = {
  onMaskChange: () => console.log("changed"),
  imgSrc: "/landing_background.png",
};
