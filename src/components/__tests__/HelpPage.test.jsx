import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HelpPage from "../HelpPage";

describe("HelpPage: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <MemoryRouter>
        <HelpPage />
      </MemoryRouter>
    );
    expect(getByText(/Obtaining the raw data/i));
  });
});
