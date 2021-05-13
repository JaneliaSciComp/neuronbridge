import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FilterProvider } from "../src/containers/FilterContext";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
};

export const decorators = [
  Story => (
    <Router>
      <FilterProvider>
        <Story />
      </FilterProvider>
    </Router>
  )
];
