import React from "react";
import SearchUploadMeta from "./SearchUploadMeta";

import "antd/dist/antd.less";

export default {
  title: 'SearchUploadMeta',
  component: SearchUploadMeta,
};

const Template = (args) => <SearchUploadMeta {...args} />;

export const Brain = Template.bind({});

Brain.args = {
  uploadedFile: {
    file: {
      name: 'foo.png'
    }
  }
};

export const VNC = Template.bind({});

VNC.args = {
  uploadedFile: {
    file: {
      name: 'foo.png'
    },
    height: 400,
    width: 100
  }
};
