import React from "react";
import MaskSelection from "./MaskSelection";

export default {
  title: 'MaskSelection',
  component: MaskSelection,
};

function Template(args){ return  <MaskSelection {...args} />; }

export const FirstStory = Template.bind({});

FirstStory.args = {
  match: {
    params: {
      id: 12345
    }
  },
  history: {},
  location: {}
};
