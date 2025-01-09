import React from "react";
import { render } from "@testing-library/react";
import { Form } from "antd";
import ColorDepthSearchParameters from "../ColorDepthSearchParameters";

describe("ColorDepthSearchParameters: unit tests", () => {
  it("renders", () => {
    const { getByText } = render(
      <Form>
        <ColorDepthSearchParameters searchMeta={{anatomicalRegion: 'Brain'}} />
      </Form>
    );
    expect(getByText(/Set the search parameters/i));
  });
});
