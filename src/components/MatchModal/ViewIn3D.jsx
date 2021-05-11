import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

export default function ViewIn3D(props) {
  const { selectedMatch, mask } = props;
  // TODO: if mask is in an EM library, show download for obj file
  // else show download for h5j file. Do the same for the match
  const downloadLinks = (
    <>
      <p>
        Download the <a href="/">match 3d volume</a> .h5j for{" "}
        {selectedMatch.publishedName}
      </p>
      {mask.precomputed ? (
        <p>
        Download the <a href="/">mask 3d volume</a> for {mask.publishedName}{" "}
        </p>
      ) : (
        <Text type="danger">We don&apos;t have a 3D representation of your uploaded file. You will need to supply one.</Text>
      )}
    </>
  );

  return (
    <>
      <h3>
        We recommend using{" "}
        <a href="https://github.com/takashi310/VVD_Viewer">VVD viewer</a> for 3D
        comparison of the matches.
      </h3>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col sm={24} md={12}>
          <Title level={3} style={{ textDecoration: "underline" }}>
            Download the 3D volumes
          </Title>
          <Text mark>
            Zip file with both files in it? - will require download lambda
          </Text>
          {downloadLinks}
        </Col>
        <Col sm={24} md={12}>
          <Title level={3} style={{ textDecoration: "underline" }}>
            Installing VVD viewer
          </Title>
          <ol>
            <li>
              Download the latest release of VVD viewer from{" "}
              <a href="https://github.com/takashi310/VVD_Viewer/releases">
                https://github.com/takashi310/VVD_Viewer/releases
              </a>
            </li>
            <li>
              Follow the installation{" "}
              <a href="https://github.com/takashi310/VVD_Viewer">
                instructions
              </a>
              .
            </li>
            <li>
              Usage instructions for VVD viewer can be found{" "}
              <a href="https://github.com/takashi310/VVD_Viewer">here</a>.
            </li>
          </ol>
        </Col>
      </Row>
    </>
  );
}

ViewIn3D.propTypes = {
  selectedMatch: PropTypes.object.isRequired,
  mask: PropTypes.object.isRequired
};
