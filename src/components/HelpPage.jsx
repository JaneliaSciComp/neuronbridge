import React from "react";
import { Typography } from "antd";
import HelpContents from "./HelpContents";

const { Title } = Typography;

export default function HelpPage() {
  return (
    <div>
      <Title>Help</Title>
        <p>A quick tutorial video highlighting different aspects of neuronbridge.</p>
        <div className="video">
          <iframe
            className="iframe"
            title="Providing reconstruction feedback"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Iw-w-O42ReE"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      <HelpContents scroll={false} />
    </div>
  );
}
