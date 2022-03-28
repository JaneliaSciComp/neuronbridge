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
