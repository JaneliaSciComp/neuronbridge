import React from "react";
import MaskDrawing from "./MaskDrawing";

import "antd/dist/antd.less";

export default {
  title: 'MaskDrawing',
  component: MaskDrawing,
};

const Template = (args) => <MaskDrawing {...args} />;

export const ImageSelected = Template.bind({});

ImageSelected.args = {
  onMaskChange: () => console.log('changed'),
  imgSrc: '/landing_background.png',
  signImage: false
};

export const NoImageSelected = Template.bind({});

NoImageSelected.args = {
  onMaskChange: () => console.log('changed'),
};

export const ImageSigned = Template.bind({});

ImageSigned.args = {
  onMaskChange: () => console.log('changed'),
  imgSrc: '/landing_background.png',
};


