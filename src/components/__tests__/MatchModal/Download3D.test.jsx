import React from "react";
import { render, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Download3D from "../../MatchModal/Download3D";
import { AppContext, AppProvider } from "../../../containers/AppContext";

describe("Download3D: unit tests", () => {
  it("renders without props", async () => {
    console.error = jest.fn();
    await expect(() =>
      render(
        <AppProvider>
          <MemoryRouter>
            <Download3D />
          </MemoryRouter>
        </AppProvider>
      )
    ).toThrow("Cannot read properties of undefined");
    await expect(console.error).toHaveBeenCalled();
  });

  it("renders correctly with props provided", async () => {
    const { getByRole } = render(
      <AppContext.Provider
        value={{
          appState: {
            dataConfig: {
              prefixes: { AlignedBodySWC: "http://test.example.com/" },
            },
          },
        }}
      >
        <MemoryRouter>
          <Download3D
            selectedMatch={{ image: { files: { AlignedBodySWC: "foo" } } }}
            mask={{}}
            isLM={false}
          />
        </MemoryRouter>
      </AppContext.Provider>
    );
    await wait();
    expect(getByRole("link", { name: ".swc" })).toHaveAttribute("href", "http://test.example.com/foo");
  });
});
