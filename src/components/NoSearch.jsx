import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function NoSearch() {

  return (
    <div>
      <Title>Not sure what to search for?</Title>
       <Paragraph>You can search for lines on the <a href="http://splitgal4.janelia.org">Split-GAL4</a> website.</Paragraph>
      <Paragraph>You can search for body ids on the <a href="https://neuprint.janelia.org">neuPrint</a> website.</Paragraph>
    </div>
  );
}
