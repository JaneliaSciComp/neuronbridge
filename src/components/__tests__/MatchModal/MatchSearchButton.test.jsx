import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MatchSearchButton from "../../MatchModal/MatchSearchButton";

describe("MatchSearchButton: unit tests", () => {
  const setIsCopying = jest.fn();

  it("renders", () => {
    render(
      <MemoryRouter>
        <MatchSearchButton
          isCopying={false}
          match={{}}
          setIsCopying={setIsCopying}
        />
      </MemoryRouter>
    );
  });
});
