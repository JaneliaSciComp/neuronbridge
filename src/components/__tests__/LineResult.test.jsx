import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LineResult from "../LineResult";

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
        />
      </MemoryRouter>
    );
    expect(getByText(/View EM Matches/i));
  });
});
