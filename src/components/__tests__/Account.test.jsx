import React from "react";
import { render, screen, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Auth, API } from "aws-amplify";
import Account from "../Account";

Auth.currentCredentials = jest.fn().mockResolvedValue({});
API.get = jest.fn().mockResolvedValue({});

describe("Account: unit tests", () => {
  it("renders", async () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );
    await wait();
    expect(screen.getByText(/Account Preferences/i));
  });
});
