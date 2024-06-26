import React from "react";
import { render, screen } from "@testing-library/react";
import CustomInputSummary from "../CustomInputSummary";
import { AppProvider } from "../../containers/AppContext";

function PlaceHolder() {
  return <p>PlaceHolder</p>;
}

describe("CustomInputSummary: unit tests", () => {
  it("renders", async () => {
    render(
      <AppProvider>
        <CustomInputSummary
          searchMeta={{
            upload: "test-file",
            updatedOn: "2021-05-04T13:18:58.915Z",
            createdOn: "2021-05-04T13:16:52.663Z",
            thumbnailURL: "http://example.com",
            imageURL: "http://example.com",
            alignFinished: true
          }}
        >
          <PlaceHolder />
          <PlaceHolder />
        </CustomInputSummary>
      </AppProvider>
    );
    expect(await screen.getByText(/Input Mask/i));
  });
});
