import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SiteSurvey from "../SiteSurvey";

describe("SiteSurvey: unit tests", () => {
  it("renders", () => {
    render(<SiteSurvey />);
  });
  it("hides when then hide survey button is clicked", () => {
    const { getByText, queryByRole } = render(<SiteSurvey />);
    const hideButton = getByText(/hide forever/i);
    fireEvent.click(hideButton);
    expect(queryByRole(/alert/)).toBeNull();
  });

  delete window.location;
  window.location = {};
  window.location.assign = jest.fn();

  it("hides when then take survey button is clicked", () => {
    document.cookie = "hideSurvey=1; expires=1 Jan 1970 00:00:00 GMT;";
    const { getByText, queryByRole } = render(<SiteSurvey />);
    const surveyButton = getByText(/take survey/i);
    fireEvent.click(surveyButton);
    expect(queryByRole(/alert/)).toBeNull();
  });

});
