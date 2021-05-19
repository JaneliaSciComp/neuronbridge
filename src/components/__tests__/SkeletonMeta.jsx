import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SkeletonMeta from "../SkeletonMeta";

describe("SkeletonMeta: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <MemoryRouter>
        <SkeletonMeta
          attributes={{
            publishedName: "skeleton1",
            libraryName: "lib1"
          }}
        />
      </MemoryRouter>
    );
    expect(getByText(/Gender/i));
  });
});
