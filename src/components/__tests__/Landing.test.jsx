import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Landing from "../Landing";

describe("Landing: unit tests", () => {
  it("renders search input when authenticated", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Landing isAuthenticated />
      </MemoryRouter>
    );
    expect(
      getByPlaceholderText(/Search with a line name/i)
    ).toBeInTheDocument();
  });
  it("renders no search input when not authenticated", () => {
    const { queryByPlaceholderText } = render(
      <MemoryRouter>
        <Landing isAuthenticated={false} />
      </MemoryRouter>
    );
    expect(queryByPlaceholderText(/Search with a line name/i)).toBeNull();
  });
});
