import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ViewIn3D from "../../MatchModal/ViewIn3D";

describe("ViewIn3D: unit tests", () => {
  it("renders", () => {
    render(
      <MemoryRouter>
        <ViewIn3D
          selectedMatch={{}}
          mask={{}}
        />
      </MemoryRouter>
    );
  });
});
