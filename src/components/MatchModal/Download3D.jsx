import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import FileImageOutlined from "@ant-design/icons/FileImageOutlined";
import FileExclamationOutlined from "@ant-design/icons/FileExclamationOutlined";
import ViewIn3DButton from "./ViewIn3DButton";

const { Title, Text, Paragraph } = Typography;

const fileIconStyles = {
  fontSize: "2em",
  float: "left",
  marginRight: "0.3em",
};

function getSWCLink(construct) {
  const swc = construct.files.AlignedBodySWC;
  if (swc) {
    return <a href={swc}>{construct.publishedName}.swc</a>;
  }
  return <span>SWC file not available</span>;
}

function getH5JLink(construct) {
  const imageStack = construct.files.VisuallyLosslessStack;
  if (imageStack) {
    return (
      <a href={imageStack}>
        {construct.publishedName}-{construct.slideCode}.h5j
      </a>
    );
  }
  return <span>H5J file not available</span>;
}

export default function Download3D(props) {
  const { selectedMatch, mask, isLM } = props;
  const { algorithm } = useParams();

  // if mask is in an EM library, show download for obj file
  // else show download for h5j file. Do the same for the match
  const downloadLinks = (
    <>
      <Paragraph>
        <FileImageOutlined style={fileIconStyles} />{" "}
        {isLM
          ? getSWCLink(mask)
          : getSWCLink(selectedMatch.image)}{" "}
        (EM Skeleton)
      </Paragraph>
      {mask.precomputed ? (
        <Paragraph>
          <FileImageOutlined style={fileIconStyles} />{" "}
          {isLM ? getH5JLink(selectedMatch.image) : getH5JLink(mask)} (LM image stack)
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
      {algorithm !== "pppm" && !mask.identityId ? (
        <p>
          <ViewIn3DButton isLM={isLM} mask={mask} match={selectedMatch} /> -
          View the match in our online volume viewer{" "}
        </p>
      ) : (
        ""
      )}
      <h3>
        For a 3D comparison with more features, use the{" "}
        <a href="https://github.com/JaneliaSciComp/VVDViewer">VVD viewer </a>
        desktop application.
      </h3>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col sm={24} md={12}>
          <Title level={3} style={{ textDecoration: "underline" }}>
            Download the 3D files
          </Title>
          {downloadLinks}
        </Col>
        <Col sm={24} md={12}>
          <Title level={3} style={{ textDecoration: "underline" }}>
            Installing VVD Viewer
          </Title>
          <ol>
            <li>
              Download the latest release of VVD Viewer from{" "}
              <a href="https://github.com/JaneliaSciComp/VVDViewer/releases">
                https://github.com/JaneliaSciComp/VVDViewer/releases
              </a>
            </li>
            <li>
              Usage instructions for VVD Viewer can be found{" "}
              <a href="https://github.com/JaneliaSciComp/VVDViewer">here</a>.
            </li>
          </ol>
        </Col>
      </Row>
    </>
  );
}

Download3D.propTypes = {
  selectedMatch: PropTypes.object.isRequired,
  mask: PropTypes.object.isRequired,
  isLM: PropTypes.bool.isRequired,
};
