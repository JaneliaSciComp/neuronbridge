import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LineResult from "../LineResult";

function PlaceHolder() {
  return <p>PlaceHolder</p>;
}

describe("LineResult: unit tests", () => {
  it("Shows CDM results button", () => {
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
            files: {
              CDSResults: 'foo'
            },
          }}
        >
          <PlaceHolder />
        </LineResult>
      </MemoryRouter>
    );
    expect(getByText(/Color Depth Search Results/i));
  });
  it("hides CDM results button when no results are found", () => {
    const { queryByText } = render(
      <MemoryRouter>
        <LineResult
          metaInfo={{
            publishedName: "pbname",
            slideCode: "foo",
            libraryName: "bar",
            upload: "test-file",
            thumbnailURL: "http://example.com",
            imageURL: "http://example.com",
            files: {
              PPPMResults: 'foo'
            },
          }}
        >
          <PlaceHolder />
        </LineResult>
      </MemoryRouter>
    );
    expect(queryByText(/Color Depth Search Results/i)).toBeNull();
  });
});
