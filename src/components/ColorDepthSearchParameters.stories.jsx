import React from "react";
import ColorDepthSearchParameters from "./ColorDepthSearchParameters";

export default {
  title: 'ColorDepthSearchParameters',
  component: ColorDepthSearchParameters,
};

function Template(args) { return <ColorDepthSearchParameters {...args} />; }

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
