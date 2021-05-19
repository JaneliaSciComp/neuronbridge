import React from "react";
import { render, within } from "@testing-library/react";
import AlignmentMeta from "../AlignmentMeta";

describe("AlignmentMeta: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <AlignmentMeta metadata={{ referenceChannel: 1 }} />
    );
    const refChannel = getByText(/Reference Channel Index/i);
    const modified = within(refChannel).getByText(/\*/);
    expect(modified).toHaveProperty("title", "Modified");
  });
});
