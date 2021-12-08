import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LineMeta from "../LineMeta";

describe("LineMeta: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <MemoryRouter>
        <LineMeta attributes={{
          slideCode: 'foo',
          libraryName: 'bar'
        }}/>
      </MemoryRouter>
    );
    expect(getByText(/Slide Code/i));
  });
});
