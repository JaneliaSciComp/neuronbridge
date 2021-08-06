import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col, Input, Divider } from "antd";
import { AppContext } from "../../containers/AppContext";
import config from "../../config";
import ImageSelection from "./ImageSelection";
import { createPPPMImagePath } from "../../libs/awsLib";
import { useQuery } from "../../libs/hooksLib";
import { CoordsProvider } from "../../containers/MouseCoordsContext";

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
    const pppmOptions = [
      {
        key: "display",
        desc: "Best Channel MIP with EM overlay",
        path: createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.ColorDepthMipSkel
        ),
        canMask: true
      },
      {
        key: "pppmMask",
        desc: "PPP Mask",
        path: createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.SignalMipMasked
        ),
        canMask: false
      },
      {
        key: "pppmMaskWithEMOverlay",
        desc: "PPP Mask with EM Overlay ",
        path: createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.SignalMipMaskedSkel
        ),
        canMask: false
      },
      {
        key: "bestMip",
        desc: "Best Channel MIP",
        path: createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.ColorDepthMip
        ),
        canMask: true
      },
      {
        key: "sampleMIP",
        desc: "Sample MIP",
        path: createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.SignalMip
        ),
        canMask: false
      },
      {
        key: "fullExpression",
        desc: "Full Expression",
        path: "image_path",
        canMask: false
      },
    ];
    return pppmOptions;
  }

  const matchImagePath = createMatchImagePath(match);
  const cdmOptions = [
    {
      key: "display",
      desc: "Gamma Corrected Color Depth MIP",
      path: match.imageURL || match.thumbnailURL,
      canMask: true
    },
    {
      key: "match",
      desc: "Match Image",
      path: matchImagePath,
      canMask: true
    }
  ];
  if (match.libraryName.match(/gen1.*mcfo/i)) {
    cdmOptions.push({
      key: "expression",
      desc: "Original Expression Pattern",
      path: "/expression_pattern.png",
      canMask: false
    });
  }
  return cdmOptions;
}

export default function ImageComparison(props) {
  const { mask, match } = props;

  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const isPPP = Boolean(match.files && match.files.ColorDepthMipSkel);

  const comparisonCount = parseInt(query.get("ci"), 10) || (isPPP ? 4 : 2);

  function setCompCount(count) {
    query.set("ci", count);
    location.search = query.toString();
    history.push(location);
  }

  const [isCopying, setIsCopying] = useState(false);
  const [appState, , setPermanent] = useContext(AppContext);

  const searchType = match.files && match.files.ColorDepthMipSkel ? "ppp" : "cdm";
  const { imageChoices } = appState;

  const maxComparisons = isPPP ? 6 : 4;
  const minComparisons = 1;

  // There are two sets of options. One set for PPPM and another for CDM
  // look at the match to see if it is a PPPM result or CDM and apply accordingly?
  const imageOptions = getMatchImageOptions(isPPP, match, mask.libraryName);

  imageOptions.unshift({
    key: "input",
    desc: "Input Image",
    path: mask.imageURL,
    canMask: true
  });

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

  // grab chosen images from the url, these will override any choices
  // made by the current user.
  const urlImageChoices = (query.get("ic") || "").split("");
  // if there were no image choices in the url, then take the current
  // users choices and set them in the url, so that they can be passed
  // on if the url is shared with another user.
  if (urlImageChoices.length < 1) {
    const combinedChoices = imageOptions.map((_, index) => {
      if (imageChoices[searchType] && imageChoices[searchType][index]) {
        return imageOptions.map(opt => opt.key).indexOf(imageChoices[searchType][index]);
      }
      return index;
    });

    query.set("ic", combinedChoices.join(""));
    location.search = query.toString();
    history.replace(location);
  }

  const images = comparisonCount
    ? [...Array(comparisonCount)].map((_, index) => {
        const key = `Image${index}`;
        const chosenImage = parseInt(urlImageChoices[index] || 0, 10);
        return (
          <Col key={key} md={comparisonCount <= 1 ? 24 : 12}>
            <ImageSelection
              imageOptions={imageOptions}
              meta={match}
              index={index}
              setIsCopying={setIsCopying}
              isCopying={isCopying}
              chosenImage={imageOptions[chosenImage]}
            />
          </Col>
        );
      })
    : "";

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <>
      <label htmlFor="cImages">
        Images for Comparison ({minComparisons} - {maxComparisons})
      </label>
      <Input
        name="cImages"
        id="cImages"
        type="number"
        style={{ width: "4em", marginLeft: "1em" }}
        value={comparisonCount || ""}
        maxLength={1}
        onChange={handleImageCount}
      />
      <Divider />
      <Row gutter={16}>
        <CoordsProvider>{images}</CoordsProvider>
      </Row>
    </>
  );
  /* eslint-enable jsx-a11y/label-has-associated-control */
}

ImageComparison.propTypes = {
  mask: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
