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
        A preprint describing this software in detail is <a href="https://doi.org/10.1101/2022.07.20.500311">available on bioRxiv</a>.
      </Paragraph>
      <Paragraph>
        <Link to="/usage">View Usage Terms</Link>
      </Paragraph>
      <Paragraph>
        <Title level={3}>Release notes:</Title>
        <ul>
          {Object.keys(config.releasenotes).map(name => (
            <li key={name}>
              <Link to={{ pathname: `/releasenotes/${name}` }}>
                {config.releasenotes[name].title}
              </Link>
            </li>
          ))}
        </ul>
      </Paragraph>
      <Title level={3}>Site Feedback Survey:</Title>
      <Paragraph>
        Please take a moment to fill out our{" "}
        <a href="https://forms.gle/tJa6GAwEjs7fykhG7">site feedback survey</a>.
      </Paragraph>
      <Row>
        <Col sm={12}>
          <Title>Team</Title>
          <Title level={3}>Scientific Advisors:</Title>
          <ul>
            <li>Geoffrey Meissner</li>
            <li>Wyatt Korff</li>
            <li>Gudrun Ihrke</li>
          </ul>

          <Title level={3}>Data Scientists:</Title>
          <ul>
            <li>Hideo Otsuna</li>
          </ul>

          <Title level={3}>Software Developers:</Title>
          <ul>
            <li>Jody Clements</li>
            <li>Cristian Goina</li>
            <li>Donald Olbris</li>
            <li>Rob Svirskas</li>
            <li>Takashi Kawase</li>
            <li>Konrad Rokicki</li>
          </ul>
          <Title level={3}>Logo Design:</Title>
          <ul>
            <li>Brianna Yarbrough</li>
            <li>Yisheng He</li>
          </ul>
          <Title level={3}>Alumni:</Title>
          <ul>
            <li>Antje Kazimiers</li>
          </ul>
        </Col>
        <Col sm={12}>
          <Title>References</Title>
          <References />
        </Col>
      </Row>
    </div>
  );
}
