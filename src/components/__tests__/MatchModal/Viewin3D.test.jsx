import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Download3D from "../../MatchModal/Download3D";
import { AppProvider } from "../../../containers/AppContext";

describe("Download3D: unit tests", () => {
  it("renders", () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <Download3D selectedMatch={{}} mask={{}} isLM={false} />
        </MemoryRouter>
      </AppProvider>
    );
  });
});
