import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HelpPage from "../HelpPage";
import { AppProvider } from "../../containers/AppContext";

describe("HelpPage: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <AppProvider>
        <MemoryRouter>
          <HelpPage />
        </MemoryRouter>
      </AppProvider>
    );
    expect(getByText(/Obtaining the raw data/i));
  });
});
