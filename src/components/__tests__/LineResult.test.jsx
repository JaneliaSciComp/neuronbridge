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
            publishedName: "pbname",
            slideCode: "foo",
            libraryName: "bar",
            upload: "test-file",
            thumbnailURL: "http://example.com",
            imageURL: "http://example.com",
          }}
        >
          <PlaceHolder />
        </LineResult>
      </MemoryRouter>
    );
    expect(getByText(/Color Depth Search Results/i));
  });
});
