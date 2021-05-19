import React from "react";
import { render } from "@testing-library/react";
import NoSearch from "../NoSearch";

describe("NoSearch: unit tests", () => {
  it("renders", () => {
    const { getByText} = render(
        <NoSearch />
    );
    expect(getByText(/Not sure what to search for/i));
  });
});
