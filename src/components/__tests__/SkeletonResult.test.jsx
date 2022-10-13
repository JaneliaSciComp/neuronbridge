import React from "react";
import { render, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SkeletonResult from "../SkeletonResult";
import { AppContext } from "../../containers/AppContext";

function PlaceHolder() {
  return <p>PlaceHolder</p>;
}

describe("SkeletonResult: unit tests", () => {
  it("Shows CDM results button", async () => {
    const { getByText } = render(
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
          <SkeletonResult
            metaInfo={{
              publishedName: "pbname",
              slideCode: "foo",
              libraryName: "bar",
              upload: "test-file",
              thumbnailURL: "http://example.com",
              imageURL: "http://example.com",
              files: {
                CDSResults: "foo",
                CDMThumbnail: "http://example.com",
                CDM: "http://example.com"
              },
            }}
          >
            <PlaceHolder />
          </SkeletonResult>
        </MemoryRouter>
      </AppContext.Provider>
    );
    await wait();
    expect(getByText(/Color Depth Search Results/i));
  });
  it("hides CDM results button when no results are found", async () => {
    const { queryByText, getByText } = render(
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
          <SkeletonResult
            metaInfo={{
              publishedName: "pbname",
              slideCode: "foo",
              libraryName: "bar",
              upload: "test-file",
              thumbnailURL: "http://example.com",
              imageURL: "http://example.com",
              files: {
                PPPMResults: "foo",
                CDMThumbnail: "http://example.com",
                CDM: "http://example.com"
              },
            }}
          >
            <PlaceHolder />
          </SkeletonResult>
        </MemoryRouter>
      </AppContext.Provider>
    );
    await wait();
    expect(queryByText(/Color Depth Search Results/i)).toBeNull();
    expect(getByText(/PatchPerPixMatch Results/i));
  });
});
