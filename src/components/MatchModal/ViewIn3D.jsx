import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Typography } from "antd";
import FileImageOutlined from "@ant-design/icons/FileImageOutlined";
import FileExclamationOutlined from "@ant-design/icons/FileExclamationOutlined";
import { AppContext } from "../../containers/AppContext";

const { Title, Text, Paragraph } = Typography;

const fileIconStyles = {
  fontSize: "2em",
  float: "left",
  marginRight: "0.3em"
};

function getSWCFilePath(baseURL, mask) {
  return `${baseURL}/${mask.libraryName}/${mask.publishedName}.swc`;
}

export default function ViewIn3D(props) {
  const [appState] = useContext(AppContext);
  const { selectedMatch, mask, isLM } = props;
  // TODO: if mask is in an EM library, show download for obj file
  // else show download for h5j file. Do the same for the match
  const downloadLinks = (
    <>
      <Paragraph>
        <FileImageOutlined style={fileIconStyles} />{" "}
        <a
          href={
            isLM
              ? "/"
              : getSWCFilePath(appState.paths.swcBaseURL, selectedMatch)
          }
        >
          {selectedMatch.publishedName}.swc
        </a>{" "}
        (match)
      </Paragraph>
      {mask.precomputed ? (
        <Paragraph>
          <FileImageOutlined style={fileIconStyles} />{" "}
          <a
            href={isLM ? getSWCFilePath(appState.paths.swcBaseURL, mask) : "/"}
          >
            {mask.publishedName}.swc
          </a>{" "}
          (mask)
        </Paragraph>
      ) : (
        <Text type="danger">
          <FileExclamationOutlined style={fileIconStyles} /> We don&apos;t have
          a 3D representation of your uploaded file. You will need to generate
          one from your original imagery.
        </Text>
      )}
    </>
  );

  return (
    <>
      <h3>
        We recommend using{" "}
        <a href="https://github.com/JaneliaSciComp/VVDViewer">VVD viewer</a> for
        3D comparison of the matches.
      </h3>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col sm={24} md={12}>
          <Title level={3} style={{ textDecoration: "underline" }}>
            Download the 3D volumes
          </Title>
          {downloadLinks}
        </Col>
        <Col sm={24} md={12}>
          <Title level={3} style={{ textDecoration: "underline" }}>
            Installing VVD viewer
          </Title>
          <ol>
            <li>
              Download the latest release of VVD viewer from{" "}
              <a href="https://github.com/JaneliaSciComp/VVDViewer/releases">
                https://github.com/JaneliaSciComp/VVDViewer/releases
              </a>
            </li>
            <li>
              Follow the installation{" "}
              <a href="https://github.com/JaneliaSciComp/VVDViewer">
                instructions
              </a>
              .
            </li>
            <li>
              Usage instructions for VVD viewer can be found{" "}
              <a href="https://github.com/JaneliaSciComp/VVDViewer">here</a>.
            </li>
          </ol>
        </Col>
      </Row>
    </>
  );
}

ViewIn3D.propTypes = {
  selectedMatch: PropTypes.object.isRequired,
  mask: PropTypes.object.isRequired,
  isLM: PropTypes.bool.isRequired
};
