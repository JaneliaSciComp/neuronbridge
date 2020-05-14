import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UsageTerms from "../UsageTerms";

describe("UsageTerms: unit tests", () => {
  it("renders", () => {
    const { getByText} = render(
      <MemoryRouter>
        <UsageTerms />
      </MemoryRouter>
    );
    expect(getByText(/usage terms/i));
  });
});
