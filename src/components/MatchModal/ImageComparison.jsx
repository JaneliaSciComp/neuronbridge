import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Input, Divider } from "antd";
import { AppContext } from "../../containers/AppContext";
import config from "../../config";
import ImageSelection from "./ImageSelection";
import { createPPPMImagePath } from "../../libs/awsLib";

import "./ImageComparison.css";

function createMatchImagePath(match) {
  if (match.imageName) {
    // generate the match image patch, from values in the match JSON
    const filename = match.imageName.match(/([^/]*).tif$/)[1];
    return `https://s3.amazonaws.com/${config.CDM_BUCKET}/${
      match.alignmentSpace
    }/${match.libraryName.replace(
      " ",
      "_"
    )}/searchable_neurons/pngs/${filename}.png`;
  }
  return "/nopath.png";
}

function getMatchImageOptions(isPPPM, match, library) {
  if (isPPPM) {
    const pppmOptions = {
      display: [
        "Best Channel MIP with EM overlay",
        createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.ColorDepthMipSkel
        )
      ],
      bestMip: [
        "Best Channel MIP",
        createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.ColorDepthMip
        )
      ],
      sampleMIP: [
        "Sample MIP",
        createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.SignalMip
        )
      ],
      fullExpression: ["Full Expression", "image_path"],
      pppmMask: [
        "PPP Mask",
        createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.SignalMipMasked
        )
      ],
      pppmMaskWithEMOverlay: [
        "PPP Mask with EM Overlay ",
        createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.SignalMipMaskedSkel
        )
      ]
    };
    return pppmOptions;
  }

  const matchImagePath = createMatchImagePath(match);
  const cdmOptions = {
    display: [
      "Gamma Corrected Color Depth MIP",
      match.imageURL || match.thumbnailURL
    ],
    match: ["Match Image", matchImagePath]
  };
  if (match.libraryName.match(/gen1.*mcfo/i)) {
    cdmOptions.expression = [
      "Original Expression Pattern",
      "/expression_pattern.png"
    ];
  }
  return cdmOptions;
}

export default function ImageComparison(props) {
  const { mask, match } = props;

  const isPPP = Boolean(match.files && match.files.ColorDepthMipSkel);
  const [comparisonCount, setCompCount] = useState(isPPP ? 4 : 2);
  const [mousePosition, setMousePosition] = useState([0, 0]);

  const [isCopying, setIsCopying] = useState(false);
  const [appState, , setPermanent] = useContext(AppContext);

  const maxComparisons = isPPP ? 6 : 4;
  const minComparisons = 1;

  // There are two sets of options. One set for PPPM and another for CDM
  // look at the match to see if it is a PPPM result or CDM and apply accordingly?
  const imageOptions = getMatchImageOptions(isPPP, match, mask.libraryName);

  imageOptions.input = ["Input Image", mask.imageURL];

  const handleImageCount = event => {
    let imageCount = parseInt(event.target.value, 10);
    imageCount = Math.max(minComparisons, imageCount);
    imageCount = Math.min(maxComparisons, imageCount);
    setCompCount(imageCount);
  };

  // Since only gen1 mcfo have this option, we need to reset to the
  // display image choice for all other libraries.
  useEffect(() => {
    if (!match.libraryName.match(/gen1.*mcfo/i)) {
      if (appState.comparisonImage === "expression") {
        setPermanent({ comparisonImage: "display" });
      }
    }
  });

  let imageDefaults = ["input", "display"];

  if (isPPP) {
    imageDefaults = ["input", "display", "pppmMask", "pppmMaskWithEMOverlay"];
  }

  const images = comparisonCount ? [...Array(comparisonCount)].map((_, index) => {
    const key = `Image${index}`;
    return (
      <Col key={key} md={comparisonCount <= 1 ? 24 : 12}>
        <ImageSelection
          imageOptions={imageOptions}
          meta={match}
          index={index}
          setIsCopying={setIsCopying}
          isCopying={isCopying}
          mousePosition={mousePosition}
          setMousePosition={setMousePosition}
          defaultImage={imageDefaults[index] || imageDefaults[0]}
        />
      </Col>
    );
  }) : "";

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <>
    <label htmlFor="cImages">Images for Comparison ({minComparisons} - {maxComparisons})</label>
      <Input
        name="cImages"
        id="cImages"
        type="number"
        style={{ width: "4em", marginLeft: "1em" }}
        value={comparisonCount || ''}
        maxLength={1}
        onChange={handleImageCount}
      />
      <Divider />
      <Row gutter={16}>{images}</Row>
    </>
  );
  /* eslint-enable jsx-a11y/label-has-associated-control */
}

ImageComparison.propTypes = {
  mask: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
