import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HelpPage from "../HelpPage";
import { AppProvider } from "../../containers/AppContext";

window.scrollTo = jest.fn();

describe("HelpPage: unit tests", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { findAllByText } = render(
      <AppProvider>
        <MemoryRouter>
          <HelpPage />
        </MemoryRouter>
      </AppProvider>
    );
    expect(findAllByText(/Obtaining the raw data/i));
  });
});
