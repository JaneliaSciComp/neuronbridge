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
  const swc = construct?.files?.AlignedBodySWC;
  if (swc) {
    return <a href={swc}>{construct.publishedName}.swc</a>;
  }
  return null;
}

function getH5JLink(construct) {
  const imageStack = construct?.files?.VisuallyLosslessStack;
  if (imageStack) {
    return (
      <a href={imageStack}>
        {construct.publishedName}-{construct.slideCode}.h5j
      </a>
    );
  }
  return null;
}

export default function Download3D(props) {
  const { selectedMatch, mask, isLM } = props;
  const { algorithm } = useParams();

  // If the match has either an AlignedBodySWC or a VisuallyLosslessStack
  // file, then we need to make it available for download, the same needs
  // to be done for the mask. If the mask has been uploaded by the user,
  // then we have nothing to download, so the links for the mask should
  // be replaced with a warning message.
  const swcLink = getSWCLink(mask) || getSWCLink(selectedMatch.image);
  const h5jLink = getH5JLink(selectedMatch.image) || getH5JLink(mask);

  // if mask is in an EM library, show download for obj file
  // else show download for h5j file. Do the same for the match
  const downloadLinks = (
    <>
      {!mask.precomputed ? (
        <Text type="danger">
          <FileExclamationOutlined style={fileIconStyles} /> We don&apos;t have
          a 3D representation of your uploaded file. You will need to generate
          one from your original imagery.
        </Text>
      ) : (
        ""
      )}

      <Paragraph>
        <FileImageOutlined style={fileIconStyles} />
        {swcLink || "SWC file not available"} (EM Skeleton)
      </Paragraph>
      <Paragraph>
        <FileImageOutlined style={fileIconStyles} />{" "}
        {h5jLink || "H5J file not available"} (LM image stack)
      </Paragraph>
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
        <a href="https://github.com/JaneliaSciComp/VVDViewer" target="_blank" rel="noopener noreferrer">VVDViewer </a>
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
            Installing VVDViewer
          </Title>
          <ol>
            <li>
              Download the latest release of VVDViewer from{" "}
              <a href="https://github.com/JaneliaSciComp/VVDViewer/releases" target="_blank" rel="noopener noreferrer">
                https://github.com/JaneliaSciComp/VVDViewer/releases
              </a>
            </li>
            <li>
              Usage instructions for VVDViewer can be found{" "}
              <a href="https://github.com/JaneliaSciComp/VVDViewer/wiki" target="_blank" rel="noopener noreferrer">here</a>.
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
