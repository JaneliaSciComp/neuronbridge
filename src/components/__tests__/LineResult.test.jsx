import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LineResult from "../LineResult";

function PlaceHolder() {
  return <p>PlaceHolder</p>;
}

describe("LineResult: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <MemoryRouter>
        <LineResult
          metaInfo={{
            upload: "test-file",
            thumbnailURL: "http://example.com",
            imageURL: "http://example.com",
            publishedName: "foo",
            libraryName: "bar"
          }}
        >
          <PlaceHolder />
        </LineResult>
      </MemoryRouter>
    );
    expect(getByText(/Color Depth Search Results/i));
  });
});
