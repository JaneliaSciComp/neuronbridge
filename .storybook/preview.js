import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "../src/containers/AppContext";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
};

export const decorators = [
  Story => (
    <Router>
      <AppProvider>
        <Story />
      </AppProvider>
    </Router>
  )
];
