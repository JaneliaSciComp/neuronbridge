import React from "react";
import { MemoryRouter } from "react-router";
import MaskSelection from "./MaskSelection";

export default {
  title: "MaskSelection",
  component: MaskSelection,
};

function Template(args) {
  return (
    <MemoryRouter>
      <MaskSelection {...args} />
    </MemoryRouter>
  );
}

export const FirstStory = Template.bind({});

FirstStory.args = {
  match: {
    params: {
      id: 12345,
    },
  },
  history: {},
  location: {},
};
