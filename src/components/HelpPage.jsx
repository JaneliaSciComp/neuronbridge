import React from "react";
import { Typography } from "antd";
import HelpContents from "./HelpContents";

const { Title } = Typography;

export default function HelpPage() {
  return (
    <div>
      <Title>Help</Title>
      <HelpContents scroll={false} />
    </div>
  );
}
