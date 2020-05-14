import "jest-axe/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import HelpButton from "../HelpButton";

describe("HelpButton: unit tests", () => {
  it("is accessible", async () => {
    const { container, rerender } = render(
      <HelpButton target="EmtoLmMatches" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    rerender(<HelpButton text="Matches Help" target="EmtoLmMatches" />);
    const updated = await axe(container);
    expect(updated).toHaveNoViolations();
  });
});
