import React from "react";
import { Typography, Row, Col } from "antd";
import HelpContents from "./Help/HelpContents";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import "./HelpPage.css";

const { Title } = Typography;

export default function HelpPage() {
  return (
    <div style={{marginTop: "1em"}}>
      <ScrollToTopOnMount />
      <Row gutter={24}>
        <Col xs={24} lg={6} className="helpTOC">
          <div>
            <Title>Help</Title>
            <ul>
              <li><a href="#rawdata">Obtaining the raw data</a></li>
              <li><a href="#search">Searching</a></li>
              <li><a href="#upload_alignment">Uploading an Alignment</a></li>
              <li><a href="#search_pipeline">Search Pipeline</a></li>
              <li><a href="#data_generation">Data Generation Pipeline</a></li>
              <li><a href="#tools">Other Tools</a></li>
            </ul>
          </div>
        </Col>
        <Col xs={24} lg={18}>
          <p>
            Watch a short tutorial video highlighting different aspects of NeuronBridge:
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
          <a className="anchorOffset" id="rawdata" href="#rawdata">#rawdata</a>
          <Title level={3}>Obtaining the raw data</Title>
          <p>
            Download the{" "}
            <a href="https://www.janelia.org/open-science/color-depth-mip">
              Color-Depth MIPs
            </a>{" "}
            for your own research.
          </p>
          <p>
            You can also{" "}
            <a href="https://open.quiltdata.com/b/janelia-flylight-color-depth/tree/README.md">
              access the data
            </a>{" "}
            on AWS S3.
          </p>
          <HelpContents scroll={false} />
          <a className="anchorOffset" id="tools" href="#tools">#tools</a>
          <Title level={3}>
            Other tools using NeuronBridge
          </Title>
          <Typography>
            <a href="http://natverse.org/neuronbridger/">neuronbridger</a> - R
            client utilities for interacting with the NeuronBridge.
          </Typography>
        </Col>
      </Row>
    </div>
  );
}
