import React from "react";
import { render } from "@testing-library/react";
import NotFound from "../NotFound";

describe("NotFound: unit tests", () => {
  it("renders", () => {
    const { getByText} = render(
        <NotFound />
    );
    expect(getByText(/404/i));
    expect(getByText(/not found/i));
  });
});
