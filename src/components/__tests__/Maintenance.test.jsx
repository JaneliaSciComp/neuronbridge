import React from "react";
import { render } from "@testing-library/react";
import Maintenance from "../Maintenance";

describe("Maintenance: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <Maintenance />
    );
    expect(getByText(/search service is down/i));
  });
});
