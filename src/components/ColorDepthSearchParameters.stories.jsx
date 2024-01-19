import React from "react";
import { MemoryRouter } from "react-router";
import ColorDepthSearchParameters from "./ColorDepthSearchParameters";

export default {
  title: "ColorDepthSearchParameters",
  component: ColorDepthSearchParameters,
};

function Template(args) {
  return (
    <MemoryRouter>
      <ColorDepthSearchParameters {...args} />
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
