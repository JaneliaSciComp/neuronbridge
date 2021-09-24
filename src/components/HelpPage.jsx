import React from "react";
import { Typography } from "antd";
import HelpContents from "./Help/HelpContents";

const { Title } = Typography;

export default function HelpPage() {
  return (
    <div>
      <Title>Help</Title>
      <p>
        A quick tutorial video highlighting different aspects of neuronbridge.
      </p>
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
      <Title level={3}>Obtaining the raw data</Title>
      <p>
        Download the{" "}
        <a href="https://www.janelia.org/open-science/color-depth-mip">
          Color-Depth MIPs
        </a>{" "}
        for your own research.
      </p>
      <HelpContents scroll={false} />
      <Title level={3} id="tools">Other tools using NeuronBridge</Title>
      <Typography>
        <a href="http://natverse.org/neuronbridger/">neuronbridger</a> - R
        client utilities for interacting with the NeuronBridge.
      </Typography>
    </div>
  );
}
