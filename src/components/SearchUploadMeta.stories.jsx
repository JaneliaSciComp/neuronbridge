import React from "react";
import SearchUploadMeta from "./SearchUploadMeta";
import { AppContext } from "../containers/AppContext";

import "antd/dist/antd.less";

export default {
  title: "SearchUploadMeta",
  component: SearchUploadMeta,
};

const Template = (args) => (
  <AppContext.Provider
    value={{
      appState: {
        dataConfig: {
          anatomicalAreas: {
            Brain: {
              label: "Brain",
              alignmentSpace: "JRC2018_Unisex_20x_HR",
            },
            VNC: {
              label: "VNC",
              alignmentSpace: "JRC2018_Unisex_20x_HR",
            },
          },
        },
      },
    }}
  >
    <SearchUploadMeta {...args} />
  </AppContext.Provider>
);

export const Brain = Template.bind({});

Brain.args = {
  uploadedFile: {
    file: {
      name: "foo.png",
    },
  },
};

export const VNC = Template.bind({});

VNC.args = {
  uploadedFile: {
    file: {
      name: "foo.png",
    },
    height: 400,
    width: 100,
  },
};
