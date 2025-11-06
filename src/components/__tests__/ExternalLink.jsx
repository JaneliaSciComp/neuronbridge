import React from "react";
import { render } from "@testing-library/react";
import ExternalLink from "../ExternalLink";

describe("ExternalLink: unit tests", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV, REACT_APP_LEVEL: 'prod' }; // Make a copy
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("formats MCFO links correctly", () => {
    const { getByText, rerender } = render(<ExternalLink id="foo" library="FlyEM Gen1 MCFO"/>);
    expect(getByText("FlyLight Gen1 MCFO")).toHaveAttribute(
      "href",
      "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" library="flylight_gen1_mcfo_case1"/>);
    expect(getByText("FlyLight Gen1 MCFO")).toHaveAttribute(
      "href",
      "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" library="gen1_mcfo_foo bar"/>);
    expect(getByText("FlyLight Gen1 MCFO")).toHaveAttribute(
      "href",
      "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" isLM={false} library="gen1_mcfo_foo bar"/>);
    expect(getByText("NeuPrint")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?dataset=gen1_mcfo_foo_bar&bodyid=foo"
    );
  });

  it("formats Split-GAL4 links correctly", () => {
    const { getByText, rerender } = render(
      <ExternalLink id="foo" />
    );
    expect(getByText("FlyLight Split-GAL4")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" library="FlyLight Split-GAL4 Drivers" />);
    expect(getByText("FlyLight Split-GAL4")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" library="FlyLight Split-GAL4 Omnibus Broad" />);
    expect(getByText("FlyLight Raw Collection")).toHaveAttribute(
      "href",
      "https://flylight-raw.janelia.org/cgi-bin/view_raw_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" library="FlyLight Split-GAL4" />);
    expect(getByText("FlyLight Split-GAL4")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" />);
    expect(getByText("FlyLight Split-GAL4")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=foo"
    );

    rerender(<ExternalLink id="foo" library="SOme other text split gal4" />);
    expect(getByText("FlyLight Split-GAL4")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=foo"
    );
  });

  it("formats EM links correctly", () => {
    const { getByText, rerender } = render(
      <ExternalLink id="foo" isLM={false} />
    );
    expect(getByText("NeuPrint")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?dataset=flylight_splitgal4_drivers&bodyid=foo"
    );

    rerender(<ExternalLink id="foo" isLM={false} library="FlyLight Split-GAL4 Drivers" />);
    expect(getByText("NeuPrint")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?dataset=flylight_split-gal4_drivers&bodyid=foo"
    );
  });
  it("formats EM links with dataset and version in the publishedName correctly", () => {
    const { getByText, rerender } = render(
      <ExternalLink id="bar_set:v1.0:foo" isLM={false} />
    );
    expect(getByText("NeuPrint")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?dataset=bar_set:v1.0&bodyid=foo"
    );

    rerender(<ExternalLink id="foo" isLM={false} library="FlyLight Split-GAL4 Drivers" />);
    expect(getByText("NeuPrint")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?dataset=flylight_split-gal4_drivers&bodyid=foo"
    );
  });

  it("formats EM links on the pre site with dataset and version in the publishedName correctly", () => {
    process.env.REACT_APP_LEVEL = 'pre';
    const { getByText } = render(
      <ExternalLink id="manc:v1.0:foo" isLM={false} library="FlyEM_MANC_V1.0" />
    );
    expect(getByText("NeuPrint")).toHaveAttribute(
      "href",
      "https://neuprint-pre.janelia.org/view?dataset=vnc&bodyid=foo"
    );
  });

  it("formats EM links on the prod site with dataset and version in the publishedName correctly", () => {
    const { getByText } = render(
      <ExternalLink id="manc:v1.0:foo" isLM={false} library="FlyEM_MANC_V1.0" />
    );
    expect(getByText("NeuPrint")).toHaveAttribute(
      "href",
      "https://neuprint.janelia.org/view?dataset=manc:v1.0&bodyid=foo"
    );
  });

  it("formats VFB links correctly", () => {
    const { getByText } = render(
      <ExternalLink id="foo" publishedName="bar" isLM />
    );
    expect(getByText("Virtual Fly Brain")).toHaveAttribute(
      "href",
      "http://virtualflybrain.org/xref/neuronbridge/bar"
    );
    expect(getByText("FlyLight Split-GAL4")).toHaveAttribute(
      "href",
      "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=foo"
    );

  });

});
