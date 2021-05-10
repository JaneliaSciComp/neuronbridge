import React from "react";
import MaskChannelSelection from "./MaskChannelSelection";

import "antd/dist/antd.less";

export default {
  title: 'MaskChannelSelection',
  component: MaskChannelSelection,
};

const Template = (args) => <MaskChannelSelection {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
