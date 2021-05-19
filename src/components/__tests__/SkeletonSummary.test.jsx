import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SkeletonSummary from "../SkeletonSummary";

describe("SkeletonSummary: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <MemoryRouter>
        <SkeletonSummary
          metaInfo={{
            publishedName: "test1",
            thumbnailURL: "https://example.com",
            imageURL: "https://example.com",
            libraryName: "lib1"
          }}
        />
      </MemoryRouter>
    );
    expect(getByText(/Back to all results/i));
  });
});
