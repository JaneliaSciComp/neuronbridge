import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import About from "../About";

describe("About: unit tests", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  });
});
