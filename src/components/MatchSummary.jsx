import React from "react";
import PropTypes from "prop-types";
import { Divider, Row, Col, Button } from "antd";
import ImageWithModal from "./ImageWithModal";
import LineMeta from "./LineMeta";
import SkeletonMeta from "./SkeletonMeta";
import DownloadSelect from "./MatchSummary/DownloadSelect";
import GenderIcon from "./MatchSummary/GenderIcon";
import { useQuery } from "../libs/hooksLib";

function getImageSrc(match, isPPP, isThumbnail) {
  if (isPPP) {
    if (isThumbnail) {
      return match.files.CDMBestThumbnail;
    }
    return match.files.CDMBest;
  }
  if (isThumbnail) {
    return match.image.files.CDMThumbnail;
  }
  return match.image.files.CDM;
}

export default function MatchSummary(props) {
  const { match, showModal, isLM, gridView } = props;
  const query = useQuery();

  // set this flag if we are looking at a PPPM result.
  const isPPP = Boolean(match.pppmScore);

  const { publishedName } = match.image;

  const isVertical = match.anatomicalArea ? Boolean(match.anatomicalArea.match(/^vnc$/i)) : false;

  if (gridView) {
    let score = ` - Rank: ${match.pppmRank}, Score: ${match.pppmScore}`;
    if (!isPPP) {
      score =
        query.get("fisort") === "2"
          ? `(Matched Pixels: ${match.matchingPixels})`
          : `(Score: ${Math.round(match.normalizedScore)})`;
    }


    const thumbnails = (
      <>
        <div style={{ position: "relative" }}>
          <DownloadSelect id={match.image.id} />
          <GenderIcon gender={match.image.gender} />
          <ImageWithModal
            thumbSrc={getImageSrc(match, isPPP, true)}
            src={getImageSrc(match, isPPP)}
            alt={publishedName}
            showModal={showModal}
            vertical={isVertical}
          />
        </div>
        <p style={{ margin: "0px", paddingLeft: "2em", paddingBottom: "1.5em" }}>
          <Button
            type="link"
            onClick={showModal}
            style={{ margin: "none", padding: "0.1em"  }}
          >
            {publishedName}
          </Button>
          {score}
        </p>
      </>
    );
    if (isVertical) {
      // squeeze a few more images into the row if they are vertical.
      return (
        <Col xs={12} md={8} lg={6} xl={4}>
          {thumbnails}
        </Col>
      );
    }
    return (
      <Col xs={24} md={12} lg={8} xl={6}>
        {thumbnails}
      </Col>
    );
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
            thumbSrc={getImageSrc(match, isPPP, true)}
            src={getImageSrc(match, isPPP)}
            alt={publishedName}
            showModal={showModal}
            vertical={isVertical}
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
            View Match
          </Button>
          <DownloadSelect id={match.image.id} asButton />
        </Col>
      </Row>
      <Divider dashed />
    </>
  );
}

MatchSummary.propTypes = {
  match: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  isLM: PropTypes.bool,
  gridView: PropTypes.bool.isRequired,
};

MatchSummary.defaultProps = {
  isLM: true,
};
