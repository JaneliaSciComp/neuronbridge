import React from "react";
import SearchUploadMeta from "./SearchUploadMeta";

import "antd/dist/antd.less";

export default {
  title: 'SearchUploadMeta',
  component: SearchUploadMeta,
};

const Template = (args) => <SearchUploadMeta {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  uploadedFile: {
    file: {
      name: 'foo.png'
    }
  }
};
