import React from "react";
import { MemoryRouter } from "react-router";
import MaskChannelSelection from "./MaskChannelSelection";

export default {
  title: "MaskChannelSelection",
  component: MaskChannelSelection,
};

function Template(args) {
  return (
    <MemoryRouter>
      <MaskChannelSelection {...args} />
    </MemoryRouter>
  );
}

export const FirstStory = Template.bind({});

FirstStory.args = {};
