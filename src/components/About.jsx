import React from "react";
import { Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import References from "./References";
import config from "../config";

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div>
      <Title>About NeuronBridge</Title>
      <Paragraph>
        NeuronBridge is a web application for easily and rapidly finding putative matches between large data sets of neurons imaged using different modalities, 
        namely electron microscopy (EM) and light microscopy (LM). Matches have been precomputed for all of Janelia&apos;s public EM/LM data sets, and are 
        quick to look up by identifier. You can also upload your own data and match it against these public data sets. 
      </Paragraph>
      <Paragraph>
        More information about the software infrastructure is available in our <a href="https://doi.org/10.1186/s12859-024-05732-7">published paper</a> and {" "}
        <a href="https://aws.amazon.com/blogs/architecture/scaling-neuroscience-research-on-aws/">AWS blog post</a>.
      </Paragraph>

      <Row gutter={20}>
        
        <Col sm={7}>
          <Title level={2}>Team</Title>
          <Title level={3}>Scientific Advisors</Title>
          <ul>
            <li>Geoffrey W. Meissner</li>
            <li>Gudrun Ihrke</li>
            <li>Wyatt Korff</li>
            <li>Gerald M. Rubin</li>
          </ul>
          <Title level={3}>Data Scientists</Title>
          <ul>
            <li>Hideo Otsuna</li>
          </ul>
          <Title level={3}>Software Developers</Title>
          <ul>
            <li>Jody Clements</li>
            <li>Cristian Goina</li>
            <li>Phillip M. Hubbard</li>
            <li>Takashi Kawase</li>
            <li>Donald J. Olbris</li>
            <li>Robert R. Svirskas</li>
            <li>Konrad Rokicki</li>
          </ul>
          <Title level={3}>Logo Design</Title>
          <ul>
            <li>Brianna Yarbrough</li>
            <li>Yisheng He</li>
          </ul>
          <Title level={3}>Alumni</Title>
          <ul>
            <li>Antje Kazimiers</li>
          </ul>
        </Col>

        <Col sm={7}>
          <Title level={2}>References</Title>
          <References />
        </Col>

        <Col sm={10}>
          <Title level={2}>Usage Agreements</Title>
          <ul>
            <li><Link to="/usage">Usage Terms</Link></li>
            <li><Link to="/upload-policy">Uploaded Data Usage and Retention Policy</Link></li>
            <li><a href="https://www.hhmi.org/privacy-policy">HHMI Privacy Policy</a></li>
          </ul>

          <Title level={2}>Release Notes</Title>
          <ul>
            {Object.keys(config.releasenotes).map(name => (
              <li key={name}>
                <Link to={{ pathname: `/releasenotes/${name}` }}>
                  {config.releasenotes[name].title}
                </Link>
              </li>
            ))}
          </ul>
        
          <Title level={2}>Site Feedback Survey</Title>
          <Paragraph>
            Please take a moment to fill out our{" "}
            <a href="https://forms.gle/tJa6GAwEjs7fykhG7">site feedback survey</a>.
          </Paragraph>

          <Title level={2}>Source Code</Title>
          <Paragraph>
            You can find all of the code for this website and the supporting infrastructure in our{" "}
            <a href="https://github.com/JaneliaSciComp/neuronbridge">GitHub repositories</a>.
          </Paragraph>

        </Col>
      </Row>
    </div>
  );
}
