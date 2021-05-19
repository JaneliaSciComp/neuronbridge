import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LineSummary from "../LineSummary";

describe("LineSummary: unit tests", () => {
  it("renders", () => {
    const { getByText, rerender } = render(
      <MemoryRouter>
        <LineSummary
          lineMeta={{
            publishedName: "test1",
            thumbnailURL: "https://example.com",
            imageURL: "https://example.com",
            libraryName: "lib1"
          }}
        />
      </MemoryRouter>
    );
    expect(getByText(/Back to all results/i));
    rerender(
      <MemoryRouter>
        <LineSummary />
      </MemoryRouter>
    );
    expect(getByText(/Loading.../i));
  });
});
