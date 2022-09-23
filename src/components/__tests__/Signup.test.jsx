import React from "react";
import { render, screen, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Auth, API } from "aws-amplify";
import Signup from "../Signup";

Auth.currentCredentials = jest.fn().mockResolvedValue({});
API.get = jest.fn().mockResolvedValue({});

describe("Signup: unit tests", () => {
  it("renders", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    await wait();
    expect(screen.getByText(/Create your account/i));
  });
});
