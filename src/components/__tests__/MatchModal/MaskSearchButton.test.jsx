import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MaskSearchButton from "../../MatchModal/MaskSearchButton";

describe("MaskSearchButton: unit tests", () => {
  const setIsCopying = jest.fn();

  it("renders", () => {
    render(
      <MemoryRouter>
        <MaskSearchButton
          src="http://www.example.com"
          isCopying={false}
          setIsCopying={setIsCopying}
        />
      </MemoryRouter>
    );
  });
});
