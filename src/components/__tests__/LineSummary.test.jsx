import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LineSummary from "../LineSummary";

function PlaceHolder() {
  return (
    <p>PlaceHolder</p>
  );
}

describe("LineSummary: unit tests", () => {
  it("renders", () => {
    const { getByText, rerender } = render(
      <MemoryRouter>
        <LineSummary
          lineMeta={{
            publishedName: "fooBar",
            libraryName: "lib1",
            slideCode: "test1",
            thumbnailURL: "https://example.com",
            imageURL: "https://example.com",
          }}
      >
          <PlaceHolder/>
        </LineSummary>
      </MemoryRouter>
    );
    expect(getByText(/Slide Code/i));
    rerender(
      <MemoryRouter>
        <LineSummary>
          <PlaceHolder/>
        </LineSummary>
      </MemoryRouter>
    );
    expect(getByText(/Loading.../i));
  });
});
