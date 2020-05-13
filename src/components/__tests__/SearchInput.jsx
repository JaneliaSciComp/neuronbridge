import "jest-axe/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router";
import SearchInput from "../SearchInput";

describe("SearchInput: unit tests", () => {
  it("is accessible", async () => {
    const { container } = render(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
