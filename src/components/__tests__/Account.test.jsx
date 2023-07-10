import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Auth, API } from "aws-amplify";
import Account from "../Account";

Auth.currentCredentials = jest.fn().mockResolvedValue({});
API.get = jest.fn().mockResolvedValue({});

describe("Account: unit tests", () => {
  it("renders", async () => {
    render(
      <MemoryRouter>
        <Account skipPrefs />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Account Preferences/i));
    });
  });
});
