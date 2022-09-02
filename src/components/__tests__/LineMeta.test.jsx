import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LineMeta from "../LineMeta";

describe("LineMeta: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <MemoryRouter>
        <LineMeta attributes={{
          image: {
            slideCode: 'foo',
            libraryName: 'bar',
            gender: 'f',
            anatomicalArea: 'Brain'
          }
        }}/>
      </MemoryRouter>
    );
    expect(getByText(/Slide Code/i).closest('p').innerHTML.match(/foo/)).not.toBe(null);
    expect(getByText(/Library/i).closest('p').innerHTML.match(/bar/)).not.toBe(null);
    expect(getByText(/Gender/i).closest('p').innerHTML.match(/Female/)).not.toBe(null);
    expect(getByText(/Anatomical Area/i).closest('p').innerHTML.match(/Brain/)).not.toBe(null);
  });
});
