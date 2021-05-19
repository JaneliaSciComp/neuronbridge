import React from "react";
import { render } from "@testing-library/react";
import CustomMeta from "../CustomMeta";

describe("CustomMeta: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <CustomMeta metadata={{
        upload: "test-file",
        updatedOn: "2021-05-04T13:18:58.915Z",
        createdOn: "2021-05-04T13:16:52.663Z"
      }}/>
    );
    expect(getByText(/Created/i));
  });
});
