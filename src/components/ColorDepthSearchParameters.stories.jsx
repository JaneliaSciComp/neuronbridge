import React from "react";
import ColorDepthSearchParameters from "./ColorDepthSearchParameters";

import "antd/dist/antd.less";

export default {
  title: 'ColorDepthSearchParameters',
  component: ColorDepthSearchParameters,
};

const Template = (args) => <ColorDepthSearchParameters {...args} />;

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
