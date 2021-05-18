import React from "react";
import Matches from "./Matches";
import { MatchesProvider } from "../containers/MatchesContext";

import "antd/dist/antd.less";

export default {
  title: 'Matches',
  component: Matches,
};

const Template = (args) => (
  <MatchesProvider>
    <Matches {...args} />
  </MatchesProvider>
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  input: {}
};
