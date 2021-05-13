import React from "react";
import FilterMenu from "./FilterMenu";

import "antd/dist/antd.less";

export default {
  title: "FilterMenu",
  component: FilterMenu
};

const Template = args => <FilterMenu {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  searchType: "skeletons",
  countsByLibrary: {
    "FlyLight Gen1 MCFO": 595,
    "FlyLight Split-GAL4 Drivers": 116
  }
};
