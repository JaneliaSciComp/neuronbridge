import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Divider, Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";
import LineMeta from "./LineMeta";
import SkeletonMeta from "./SkeletonMeta";
import DownloadSelect from "./MatchSummary/DownloadSelect";
import { signedPublicLink, createPPPMImagePath } from "../libs/awsLib";
import { useQuery } from "../libs/hooksLib";

export default function MatchSummary(props) {
  const { match, showModal, isLM, gridView, library, paths } = props;
  const [signedSrc, setSignedSrc] = useState();
  const [signedThumbnailSrc, setSignedThumbnailSrc] = useState();
  const query = useQuery();

  // set this flag if we are looking at a PPPM result.
  const isPPP = Boolean(match.pppScore);

  useEffect(() => {
    if (isPPP && match.files?.ColorDepthMipSkel) {
      const url = createPPPMImagePath({
        alignmentSpace: match.alignmentSpace,
        library,
        relativePath: match.files?.ColorDepthMip,
        baseURL: paths.pppImageryBaseURL
      });
      signedPublicLink(url).then(signed => {
        setSignedSrc(signed);
        setSignedThumbnailSrc(signed);
      });
    } else if (match.imageURL) {
      signedPublicLink(match.imageURL).then(signed => {
        setSignedSrc(signed);
      });
      signedPublicLink(match.thumbnailURL).then(signed => {
        setSignedThumbnailSrc(signed);
      });
    }
  }, [match, isPPP, library, paths.pppImageryBaseURL]);

  const { publishedName } = match;

  const thumbnailURL = signedThumbnailSrc;
  const imageURL = signedSrc;

  if (!thumbnailURL || !imageURL) {
    return null;
  }

  if (gridView) {
    let score = ` - Rank: ${match.pppRank}, Score: ${match.pppScore}`;
    if (!isPPP) {
      score =
        query.get("fisort") === "2"
          ? `(Matched Pixels: ${match.matchingPixels})`
          : `(Score: ${Math.round(match.normalizedScore)})`;
    }

    const thumbnails = (
      <>
        <div style={{ position: "relative" }}>
          <DownloadSelect id={match.id} />
          <ImageWithModal
            thumbSrc={thumbnailURL}
            src={imageURL}
            alt={publishedName}
            showModal={showModal}
            vertical={match.anatomicalArea === "VNC"}
          />
        </div>
        <p style={{ paddingLeft: "2em" }}>
          <Button
            type="link"
            onClick={showModal}
            style={{ padding: "0.1em", margin: "none" }}
          >
            {publishedName}
          </Button>
          {score}
        </p>
      </>
    );
    if (match.anatomicalArea === "VNC") {
      // squeeze a few more images into the row if they are vertical.
      return (<Col xs={12} md={8} lg={6} xl={4}>{thumbnails}</Col>);
    }
    return (<Col xs={24} md={12} lg={8} xl={6}>{thumbnails}</Col>);
  }

  return (
    <>
      <Row className="matchSummary">
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 12, order: 1 }}
          md={{ span: 8, order: 1 }}
        >
          <ImageWithModal
            thumbSrc={thumbnailURL}
            src={imageURL}
            alt={publishedName}
            showModal={showModal}
            vertical={match.anatomicalArea === "VNC"}
          />
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          sm={{ span: 24, order: 3 }}
          md={{ span: 10, order: 2 }}
        >
          {isLM ? (
            <LineMeta attributes={match} />
          ) : (
            <SkeletonMeta attributes={match} />
          )}
        </Col>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 12, order: 2 }}
          md={{ span: 6, order: 3 }}
        >
          <Button onClick={showModal} style={{ marginRight: "1em" }}>
            Select
          </Button>
          <DownloadSelect id={match.id} asButton />
        </Col>
      </Row>
      <Divider dashed />
    </>
  );
}

MatchSummary.propTypes = {
  library: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  isLM: PropTypes.bool,
  gridView: PropTypes.bool.isRequired,
  paths: PropTypes.object
};

MatchSummary.defaultProps = {
  isLM: true,
  paths: {}
};
