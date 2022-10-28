import React from "react";
import { Typography, Row, Col } from "antd";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import HelpContents from "./Help/HelpContents";
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
              <li><a href="#search">Searching</a></li>
              <li><a href="#data_generation">Data generation</a></li>
              <li><a href="#search_pipeline">Precomputed matching</a></li>
              <li><a href="#upload_alignment">Image alignment</a></li>
              <li><a href="#rawdata">Downloading the data</a></li>
              <li><a href="#programmatic">Programmatic API access</a></li>
              <li><a href="#tools">Third-party tools</a></li>
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

          <HelpContents scroll={false} />

          <a className="anchorOffset" id="rawdata" href="#rawdata">#rawdata</a>
          <Title level={3}>Downloading the data</Title>
          <p>
            You can download the{" "}
            <a href="https://www.janelia.org/open-science/color-depth-mip">
              Color-Depth MIPs
            </a>{" "}
            for your own research.
          </p>

          <a className="anchorOffset" id="programmatic" href="#rawdata">#rawdata</a>
          <Title level={3}>Programmatic API access</Title>
          <p>
            Access the images programmatically{" "}
            <a href="https://open.quiltdata.com/b/janelia-flylight-color-depth/tree/README.md">
              using the S3 API
            </a>{" "}
            on AWS Open Data.

            The matches are also available on S3, in a{" "}
            <a href="https://open.quiltdata.com/b/janelia-neuronbridge-data-prod/tree/">different bucket</a>.
          </p>
          <p>
            You can also use <a href="https://github.com/JaneliaSciComp/neuronbridge-python">Python API</a> to access the matches and images using Python.
          </p>

          <a className="anchorOffset" id="tools" href="#tools">#tools</a>
          <Title level={3}>Third-party tools</Title>
          <Typography>
            <a href="http://natverse.org/neuronbridger/">neuronbridger</a> - R
            library for interacting with the NeuronBridge.
          </Typography>
        </Col>
      </Row>
    </div>
  );
}
