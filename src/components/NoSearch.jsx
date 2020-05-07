import React from "react";
import { Typography } from "antd";
import HelpButton from "./HelpButton";

const { Title, Paragraph } = Typography;

export default function NoSearch() {
  return (
    <div>
      <Title>Not sure what to search for?</Title>
      <Paragraph>
        You can search for line names on the{" "}
        <a href="http://splitgal4.janelia.org">Split-GAL4</a> or{" "}
        <a href="http://gen1mcfo.janelia.org/cgi-bin/gen1mcfo.cgi">
          Generation 1 MCFO
        </a>{" "}
        websites.
      </Paragraph>
      <Paragraph>
        Explore body ids on the{" "}
        <a href="https://neuprint.janelia.org">neuPrint</a> website.
      </Paragraph>
      <Title level={3}>Search Help</Title>
      <p>
        Not sure how to search? Have a look at the{" "}
        <HelpButton target="SearchInput" text="help documentation" />
      </p>
    </div>
  );
}
