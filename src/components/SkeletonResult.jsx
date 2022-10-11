import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Space } from "antd";
import PropTypes from "prop-types";
import ImageWithModal from "./ImageWithModal";
import SkeletonMeta from "./SkeletonMeta";
import config from "../config";

export default function SkeletonResult(props) {
  const { metaInfo } = props;

  const handleClick = (type) => {
    if (config.fathomEventKeys) {
      if (config.fathomEventKeys[type]) {
        if (window.fathom) {
          window.fathom.trackGoal(config.fathomEventKeys[type], 0);
        }
      }
    }
  };

  function generateCdmMatchesButton() {
    const matchesUrl = `/matches/cdm/${metaInfo.files?.CDSResults.replace(
      /\.json$/,
      ""
    )}`;
    return (
      <Button
        aria-label="View Color Depth Search Results"
        type="primary"
        style={{ width: "100%" }}
        onClick={() => handleClick("clickCDM")}
      >
        <Link to={matchesUrl}>Color Depth Search Results</Link>
      </Button>
    );
  }

  const cdmMatchesButton = metaInfo?.files?.CDSResults
    ? generateCdmMatchesButton()
    : "";

  function generatePppmMatchesButton() {
    const pppUrl = `/matches/pppm/${metaInfo.files?.PPPMResults.replace(
      /\.json$/,
      ""
    )}`;
    return (
      <Button
        aria-label="View PatchPerPixMatch Results"
        type="primary"
        style={{ width: "100%" }}
        onClick={() => handleClick("clickPPP")}
      >
        <Link to={pppUrl}>PatchPerPixMatch Results </Link>
      </Button>
    );
  }

  const pppmMatchesButton = metaInfo?.files?.PPPMResults
    ? generatePppmMatchesButton()
    : "";

  const thumbSrc = metaInfo?.files?.CDMThumbnail;
  const imgSrc = metaInfo?.files?.CDM;

  return (
    <Row>
      <Col md={10}>
        <ImageWithModal
          thumbSrc={thumbSrc}
          src={imgSrc}
          title={metaInfo.publishedName}
          vertical={
            metaInfo.anatomicalArea === "VNC" ||
            metaInfo.libraryName?.toLowerCase().includes("vnc")
          }
        />
      </Col>
      <Col md={9}>
        <SkeletonMeta attributes={{ image: metaInfo }} fromSearch />
      </Col>
      <Col md={5}>
        <Space direction="vertical">
          {cdmMatchesButton}
          {pppmMatchesButton}
        </Space>
      </Col>
    </Row>
  );
}

SkeletonResult.propTypes = {
  metaInfo: PropTypes.object.isRequired,
};
