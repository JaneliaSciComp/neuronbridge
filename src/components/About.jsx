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
        Neuroscience research is being revolutionized by the comprehensive
        mapping of whole nervous systems. Janelia Research Campus is leading
        this effort in the fruit fly, Drosophila melanogaster, via light and
        electron microscopy. Moving between these two modalities was previously
        possible through the use of NBLAST, which provides a powerful geometric
        vector-based comparison between neurons. However, use of NBLAST requires
        segmented neuron skeletons, which are difficult to reconstruct in dense
        light microscopy data. A complementary approach, termed “color depth
        mask search”, was published in{" "}
        <a href="https://doi.org/10.1101/318006">Otsuna, et. al(2018)</a> and is
        now in widespread use for LM-EM finding correspondences. The
        NeuronBridge application provides browsing of color depth search results
        for LM and EM data published by the FlyLight and FlyEM projects. For LM
        this includes the Gen1 and Split-GAL4 data sets, and for EM, the
        Hemibrain release. In the near future, we will continue to update the
        available image libraries and also add the ability to search published
        data using user-provided neuronal masks.
      </Paragraph>

      <Paragraph>
        This method represents 3d voxel space in a 2d image by encoding depth as
        color, and allows for a fast pixel-based comparison across specimens.
        Both LM image volumes and EM reconstructions can be represented in this
        space, leading to efficient LM-&gt;EM and EM-&gt;LM searching.
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
