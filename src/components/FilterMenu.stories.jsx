import React from "react";
import { MemoryRouter } from "react-router";
import FilterMenu from "./FilterMenu";

export default {
  title: "FilterMenu",
  component: FilterMenu,
};

function Template(args) {
  return (
    <MemoryRouter>
      <FilterMenu {...args} />
    </MemoryRouter>
  );
}

export const LMMatches = Template.bind({});

LMMatches.args = {
  matchesType: "lm",
  countsByLibrary: {
    "FlyLight Gen1 MCFO": 595,
    "FlyLight Split-GAL4 Drivers": 116,
  },
};

export const EMMatches = Template.bind({});

EMMatches.args = {
  matchesType: "em",
  countsByLibrary: {
    "FlyEM VNC v0.6": 595,
    "FlyEM Hemibrain v0.5": 116,
  },
};

export const WithGenderFilter = Template.bind({});

WithGenderFilter.args = {
  matchesType: "em",
  useGenderFilter: true,
  countsByLibrary: {
    "FlyEM VNC v0.6": 595,
    "FlyEM Hemibrain v0.5": 116,
  },
};
