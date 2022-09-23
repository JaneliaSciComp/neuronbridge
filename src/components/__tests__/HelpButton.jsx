import "jest-axe/extend-expect";
import React, { useContext } from "react";
import { render, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import HelpButton from "../Help/HelpButton";
import { AppContext } from "../../containers/AppContext";


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

  const setStateMock = jest.fn();
  it("updates AppContext when pressed", async () => {
    const { container, getByText } = render(
      <AppContext.Provider
        value={{
          appState: {
            showHelp: false,
            helpTarget: null
          },
          setAppState: setStateMock,
        }}
      >
        <HelpButton target="EmtoLmMatches" />
      </AppContext.Provider>
    );
    expect(getByText(/\?/i));
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(setStateMock.mock.calls.length).toBe(1);
    expect(setStateMock.mock.calls[0][0].helpTarget).toBe('EmtoLmMatches');
    expect(setStateMock.mock.calls[0][0].showHelp).toBe(true);
  });
});
