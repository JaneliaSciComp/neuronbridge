import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ViewIn3D from "../../MatchModal/ViewIn3D";
import { AppProvider } from "../../../containers/AppContext";

describe("ViewIn3D: unit tests", () => {
  it("renders", () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <ViewIn3D selectedMatch={{}} mask={{}} isLM={false} />
        </MemoryRouter>
      </AppProvider>
    );
  });
});
