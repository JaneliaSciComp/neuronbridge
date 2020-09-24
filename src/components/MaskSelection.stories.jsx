import React from "react";
import MaskSelection from "./MaskSelection";

import "antd/dist/antd.less";

export default {
  title: 'MaskSelection',
  component: MaskSelection,
};

const Template = (args) => <MaskSelection {...args} />;

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
