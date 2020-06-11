import React from "react";
import { render } from "@testing-library/react";
import ExternalLink from "../ExternalLink";

describe("ExternalLink: unit tests", () => {
  it("formats MCFO links correctly", () => {
    const { getByText, rerender } = render(<ExternalLink publishedName="foo" library="FlyEM Gen1 MCFO"/>);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?line=foo"
    );

    rerender(<ExternalLink publishedName="foo" library="flylight_gen1_mcfo_case1"/>);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?line=foo"
    );

    rerender(<ExternalLink publishedName="foo" library="gen1_mcfo_foo bar"/>);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?line=foo"
    );

    rerender(<ExternalLink publishedName="foo" isLM={false} library="gen1_mcfo_foo bar"/>);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?bodyid=foo"
    );
  });

  it("formats Split-GAL4 links correctly", () => {
    const { getByText, rerender } = render(
      <ExternalLink publishedName="foo" />
    );
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?line=foo"
    );

    rerender(<ExternalLink publishedName="foo" library="FlyLight Split-GAL4 Drivers" />);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?line=foo"
    );

    rerender(<ExternalLink publishedName="foo" library="FlyLight Split-GAL4" />);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?line=foo"
    );

    rerender(<ExternalLink publishedName="foo" />);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?line=foo"
    );

    rerender(<ExternalLink publishedName="foo" library="SOme other text split gal4" />);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?line=foo"
    );
  });

  it("formats EM links correctly", () => {
    const { getByText, rerender } = render(
      <ExternalLink publishedName="foo" isLM={false} />
    );
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?bodyid=foo"
    );

    rerender(<ExternalLink publishedName="foo" isLM={false} library="FlyLight Split-GAL4 Drivers" />);
    expect(getByText("foo")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?bodyid=foo"
    );
  });

});
