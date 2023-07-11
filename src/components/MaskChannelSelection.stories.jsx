import React from "react";
import MaskChannelSelection from "./MaskChannelSelection";

export default {
  title: 'MaskChannelSelection',
  component: MaskChannelSelection,
};

function Template (args) { return <MaskChannelSelection {...args} />; }

export const FirstStory = Template.bind({});

FirstStory.args = {};
