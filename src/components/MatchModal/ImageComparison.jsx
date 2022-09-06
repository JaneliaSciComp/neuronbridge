import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col, Select, Divider } from "antd";
import { AppContext } from "../../containers/AppContext";
import ImageSelection from "./ImageSelection";
import { createPPPMImagePath } from "../../libs/awsLib";
import { useQuery } from "../../libs/hooksLib";
import { CoordsProvider } from "../../containers/MouseCoordsContext";

import "./ImageComparison.css";

const { Option } = Select;

function createSourceSearchablePath(match, baseURL) {
  if (match.files.ColorDepthMipInput) {
    // for precomputed searches.
    return `${baseURL.ColorDepthMipInput}${match.files.ColorDepthMipInput}`;
  }
  return "/nopath.png";
}

function createMatchImagePath(match, prefixes) {
  if (match?.files?.ColorDepthMipMatch) {
    // generate the match image path, from values in the match JSON
    return `${prefixes.ColorDepthMipMatch}${match.files.ColorDepthMipMatch}`;
  }
  return "/nopath.png";
}

function getMatchImageOptions(
  isPPPM,
  match,
  library,
  isLM,
  prefixes,
) {
  if (isPPPM) {
    const pppmOptions = [
      {
        key: "bestMip",
        desc: "LM - Best Channel CDM",
        imageType: "LM",
        path: createPPPMImagePath({
          alignmentSpace: match.image.alignmentSpace,
          library,
          relativePath: match.files?.ColorDepthMip,
          baseURL: prefixes.SignalMip
        }),
        canMask: false
      },
      {
        key: "display",
        desc: "LM - Best Channel CDM with EM Overlay",
        imageType: "LM",
        path: createPPPMImagePath({
          alignmentSpace: match.image.alignmentSpace,
          library,
          relativePath: match.files?.ColorDepthMipSkel,
          baseURL: prefixes.ColorDepthMipSkel
        }),
        canMask: false
      },
      {
        key: "sampleMIP",
        desc: "LM - Sample All-Channel MIP",
        imageType: "LM",
        path: createPPPMImagePath({
          alignmentSpace: match.image.alignmentSpace,
          library,
          relativePath: match.files?.SignalMip,
          baseURL: prefixes.SignalMip
        }),
        canMask: false
      },
      {
        key: "pppmMask",
        desc: "PPPM Mask",
        imageType: "EM",
        path: createPPPMImagePath({
          alignmentSpace: match.image.alignmentSpace,
          library,
          relativePath: match.files?.SignalMipMasked,
          baseURL: prefixes.SignalMipMasked
        }),
        canMask: false
      },
      {
        key: "pppmMaskWithEMOverlay",
        desc: "PPPM Mask with EM Overlay",
        imageType: "EM",
        path: createPPPMImagePath({
          alignmentSpace: match.image.alignmentSpace,
          library,
          relativePath: match.files?.SignalMipMaskedSkel,
          baseURL: prefixes.SignalMipMaskedSkel
        }),
        canMask: false
      }
      /* {
        key: "fullExpression",
        desc: "LM - Gen1-GAL4 Expression Pattern",
        imageType: "LM",
        path: "image_path",
        canMask: false
      } */
    ];
    return pppmOptions;
  }

  const matchImagePath = createMatchImagePath(match, prefixes);
  const cdmOptions = [
    {
      key: "match",
      desc: isLM
        ? "LM - Matched CDM (Segmented)"
        : "EM - Matched CDM (Generated)",
      imageType: isLM ? "LM" : "EM",
      path: matchImagePath,
      canMask: true
    },
    {
      key: "display",
      desc: `${isLM ? "LM - Original Channel CDM" : "EM - Neuron CDM"}`,
      imageType: isLM ? "LM" : "EM",
      path: match.imageURL || match.thumbnailURL,
      canMask: true
    }
  ];
  if (match.files.ColorDepthMipInput) {
    const path = createSourceSearchablePath(match, prefixes);
    cdmOptions.push({
      key: "segmented",
      desc: `${
        isLM ? "EM - Matched CDM (Generated)" : "LM - Matched CDM (Segmented)"
      }`,
      imageType: isLM ? "EM" : "LM",
      path,
      canMask: false
    });
  }
  /* TODO: uncomment this when the data is ready.
  if (match.libraryName.match(/gen1.*mcfo/i)) {
    cdmOptions.push({
      key: "expression",
      desc: "LM - Gen1-GAL4 Expression Pattern",
      imageType: "LM",
      path: "/expression_pattern.png",
      canMask: false
    });
  } */
  return cdmOptions;
}

export default function ImageComparison(props) {
  const { mask, match, isLM, children } = props;

  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const { appState, setPermanent } = useContext(AppContext);
  const [isCopying, setIsCopying] = useState(false);

  const searchType = match.pppRank !== undefined ? "ppp" : "cdm";
  const isPPP = searchType === "ppp";

  // Unify the anatomical region properties from pre computed and custom searches.
  // TODO: this step wouldn't be necessary if the keys were the same in both.
  const anatomicalRegion = (
    (mask.anatomicalArea ? mask.anatomicalArea : mask.anatomicalRegion) ||
    match.anatomicalArea ||
    "brain"
  ).toLowerCase();
  const isVertical =
    anatomicalRegion === "vnc" ||
    Boolean(mask?.libraryName?.toLowerCase()?.includes("vnc"));

  // There are two sets of options. One set for PPPM and another for CDM
  // look at the match to see if it is a PPPM result or CDM and apply accordingly?
  const imageOptions = getMatchImageOptions(
    isPPP,
    match,
    mask.libraryName,
    isLM,
    appState.dataConfig.prefixes,
  );

  // both PPPM and CDM searches have an input image.
  imageOptions.unshift({
    key: "input",
    desc: `${isLM ? "EM - Neuron CDM" : "LM - Original Channel CDM"}`,
    imageType: isLM ? "EM" : "LM",
    path: mask.imageURL,
    canMask: true
  });

  // start by looking for a value in the url query parameters,
  // then use the value stored in localStorage and finally fall back to the
  // default values.
  const storedCounts = appState.comparisonCount;

  const urlImageCount = parseInt(query.get("ci"), 10);

  const updatedCount = urlImageCount || storedCounts[searchType];

  if (Number.isNaN(urlImageCount)) {
    query.set("ci", updatedCount);
    location.search = query.toString();
    history.replace(location);
  }

  function setCompCount(count) {
    // update localStorage
    storedCounts[searchType] = count;
    setPermanent({
      comparisonCount: storedCounts
    });
    if (count > 0) {
      // update the url
      query.set("ci", count);
      location.search = query.toString();
      history.replace(location);
    }
  }

  const { imageChoices } = appState;

  const maxComparisons = imageOptions.length;
  const defaultComparisons = isPPP ? 4 : 2;
  const minComparisons = 1;

  const handleImageCount = newCount => {
    let imageCount = parseInt(newCount, 10);
    imageCount = Math.max(minComparisons, imageCount);
    imageCount = Math.min(maxComparisons, imageCount);
    setCompCount(imageCount);
  };

  // Since only gen1 mcfo have this option, we need to reset to the
  // display image choice for all other libraries.
  useEffect(() => {
    if (!match.image.libraryName.match(/gen1.*mcfo/i)) {
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
        return imageOptions
          .map(opt => opt.key)
          .indexOf(imageChoices[searchType][index]);
      }
      return index;
    });

    query.set("ic", combinedChoices.join(""));
    location.search = query.toString();
    history.replace(location);
  }

  // some times the comparison count will be greater than the number of image options.
  // In those cases, don't change the comparison count, just show the available images
  // and move on.
  const imageCount = Math.min(
    imageOptions.length,
    updatedCount || defaultComparisons
  );

  // this sets narrower columns if the images are tall VNC images.
  const colWidth = isVertical ? 8 : 12;

  const images = imageCount
    ? [...Array(imageCount)].map((_, index) => {
        const key = `Image${index}-${match.id}`;
        const chosenImageId = parseInt(urlImageChoices[index] || 0, 10);
        if (imageOptions[chosenImageId]) {
          return (
            <Col key={key} lg={updatedCount <= 1 ? 24 : colWidth}>
              <ImageSelection
                vertical={isVertical}
                imageOptions={imageOptions}
                meta={match}
                index={index}
                setIsCopying={setIsCopying}
                isCopying={isCopying}
                chosenImageId={chosenImageId}
                anatomicalRegion={anatomicalRegion}
              />
            </Col>
          );
        }
        return null;
      })
    : "";

  const selectOptions = [...Array(maxComparisons)].map((_, index) => {
    const key = `${index}option`;
    return (
      <Option key={key} value={index + 1}>
        {index + 1}
      </Option>
    );
  });

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <>
      <label htmlFor="cImages">
        Images for Comparison ({minComparisons} - {maxComparisons})
      </label>
      <Select
        name="cImages"
        id="cImages"
        style={{ width: "4em", marginLeft: "1em" }}
        value={Math.min(imageOptions.length, updatedCount) || ""}
        onSelect={handleImageCount}
      >
        {selectOptions}
      </Select>
      {children}
      <Divider />
      <Row gutter={16}>
        <CoordsProvider>{images}</CoordsProvider>
      </Row>
    </>
  );
  /* eslint-enable jsx-a11y/label-has-associated-control */
}

ImageComparison.propTypes = {
  children: PropTypes.node,
  mask: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isLM: PropTypes.bool.isRequired
};

ImageComparison.defaultProps = {
  children: null
};
