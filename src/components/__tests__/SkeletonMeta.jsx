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
            image: {
              publishedName: "skeleton1",
              libraryName: "lib1",
              gender: 'f'
            }
          }}
        />
      </MemoryRouter>
    );
    expect(getByText(/Gender/i).closest('p').innerHTML.match(/Female/)).not.toBe(null);
  });
});
