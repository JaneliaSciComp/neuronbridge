import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SkeletonSummary from "../SkeletonSummary";

function PlaceHolder() {
  return <p>PlaceHolder</p>;
}

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
        >
          <PlaceHolder />
        </SkeletonSummary>
      </MemoryRouter>
    );
    expect(getByText(/Back to all results/i));
  });
});
