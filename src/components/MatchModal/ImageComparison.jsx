import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Select } from "antd";
import { AppContext } from "../../containers/AppContext";
import ImageDisplay from "./ImageDisplay";
import config from "../../config";
import {createPPPMImagePath} from "../../libs/awsLib";

import "./ImageComparison.css";

const { Option } = Select;

function getMousePos(evt) {
  const canvas = evt.target;
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) * canvas.width) / canvas.clientWidth,
    y: ((evt.clientY - rect.top) * canvas.height) / canvas.clientHeight
  };
}

function drawCrosshair(x, y, ctx) {
  const armLength = 20;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - armLength);
  ctx.moveTo(x, y);
  ctx.lineTo(x + armLength, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x - armLength, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + armLength);
  ctx.stroke();
}

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
          match.files.SignalMip
        )
      ],
      sampleMIP: [
        "Sample MIP",
        createPPPMImagePath(
          match.alignmentSpace,
          library,
          match.files.ColorDepthMip
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
  const { mask, maskOpen, match, setMaskOpen } = props;

  const [isCopying, setIsCopying] = useState(false);
  const matchRef = useRef();
  const maskRef = useRef();
  const [appState, , setPermanent] = useContext(AppContext);

  // TODO: there are two sets of options. One set for PPPM and another for CDM
  // look at the match to see if it is a PPPM result or CDM and apply accordingly?
  const imageOptions = getMatchImageOptions(
    Boolean(match.files && match.files.ColorDepthMipSkel),
    match,
    mask.libraryName
  );

  imageOptions.input = ["Input Image", mask.imageURL];

  const matchImageURL = imageOptions[appState.comparisonImage]
    ? imageOptions[appState.comparisonImage][1]
    : imageOptions.display[1];

  const matchImageURL1 = imageOptions[appState.comparisonImage1]
    ? imageOptions[appState.comparisonImage1][1]
    : imageOptions.input[1];

  const handleImageChoice = selected => {
    setPermanent({ comparisonImage: selected });
  };

  const handleFirstImageChoice = selected => {
    setPermanent({ comparisonImage1: selected });
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

  useEffect(() => {
    const currentMatch = matchRef.current;
    const currentMask = maskRef.current;

    const matchCtx = currentMatch.getContext("2d");
    const maskCtx = currentMask ? currentMask.getContext("2d") : null;

    function movecrosshair(e) {
      const pos = getMousePos(e);
      if (matchCtx) {
        drawCrosshair(pos.x, pos.y, matchCtx);
      }
      if (maskCtx) {
        drawCrosshair(pos.x, pos.y, maskCtx);
      }
    }

    if (currentMatch) {
      currentMatch.addEventListener("mousemove", movecrosshair);
    }
    if (currentMask) {
      currentMask.addEventListener("mousemove", movecrosshair);
    }

    return function cleanup() {
      if (currentMatch) {
        currentMatch.removeEventListener("mousemove", movecrosshair);
      }

      if (currentMask) {
        currentMask.removeEventListener("mousemove", movecrosshair);
      }
    };
  }, [maskOpen, mask, match]);

  return (
    <>
      <Row gutter={16}>
        {maskOpen && (
          <Col md={12}>
            <Row>
              <Select
                onChange={handleFirstImageChoice}
                value={
                  imageOptions[appState.comparisonImage1] || imageOptions.input
                }
                style={{ width: 300 }}
              >
                {Object.keys(imageOptions).map(key => (
                  <Option key={key} value={key}>
                    {imageOptions[key][0]}
                  </Option>
                ))}
              </Select>
            </Row>

            <ImageDisplay
              meta={mask}
              ref={maskRef}
              src={matchImageURL1}
              alt={
                imageOptions[appState.comparisonImage1]
                  ? imageOptions[appState.comparisonImage1][0]
                  : imageOptions.input[0]
              }
              onHide={() => setMaskOpen(false)}
              setIsCopying={setIsCopying}
              isCopying={isCopying}
            />
          </Col>
        )}
        <Col md={maskOpen ? 12 : 24}>
          <Row>
            <Select
              onChange={handleImageChoice}
              value={
                imageOptions[appState.comparisonImage] || imageOptions.display
              }
              style={{ width: 300 }}
            >
              {Object.keys(imageOptions).map(key => (
                <Option key={key} value={key}>
                  {imageOptions[key][0]}
                </Option>
              ))}
            </Select>
          </Row>
          <ImageDisplay
            meta={match}
            ref={matchRef}
            src={matchImageURL}
            alt={
              imageOptions[appState.comparisonImage]
                ? imageOptions[appState.comparisonImage][0]
                : imageOptions.display[0]
            }
            isMask={false}
            onShow={() => setMaskOpen(true)}
            setIsCopying={setIsCopying}
            imageType={appState.comparisonImage}
            isCopying={isCopying}
            maskOpen={maskOpen}
          />
        </Col>
      </Row>
    </>
  );
}

ImageComparison.propTypes = {
  mask: PropTypes.object.isRequired,
  maskOpen: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  setMaskOpen: PropTypes.func.isRequired
};
