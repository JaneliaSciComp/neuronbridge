import React from "react";
import { render } from "@testing-library/react";
import MaintenanceBanner from "../MaintenanceBanner";

describe("Maintenance: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <MaintenanceBanner />
    );
    expect(getByText(/Our services are down/i));
  });
});
