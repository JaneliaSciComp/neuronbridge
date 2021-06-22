import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Checkbox, Row, Col, Select } from "antd";
import { AppContext } from "../../containers/AppContext";
import { useMatches } from "../../containers/MatchesContext";
import ImageDisplay from "./ImageDisplay";

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

export default function ImageComparison(props) {
  const { mask, maskOpen, match, setMaskOpen } = props;

  const { state, dispatch } = useMatches();

  const [isCopying, setIsCopying] = useState(false);
  const matchRef = useRef();
  const maskRef = useRef();
  const [appState, , setPermanent] = useContext(AppContext);
  // generate the match image patch, from values in the match JSON
  const filename = match.imageName.match(/([^/]*).tif$/)[1];
  const matchImagePath = `https://s3.amazonaws.com/janelia-flylight-color-depth-dev/${
    match.alignmentSpace
  }/${match.libraryName.replace(
    " ",
    "_"
  )}/searchable_neurons/pngs/${filename}.png`;

  const imageOptions = {
    display: ["Display Image", match.imageURL || match.thumbnailURL],
    match: ["Match Image", matchImagePath]
  };

  if (match.libraryName.match(/gen1.*mcfo/i)) {
    imageOptions.expression = [
      "Original Expression Pattern",
      "/expression_pattern.png"
    ];
  }

  const matchImageURL = imageOptions[appState.comparisonImage]
    ? imageOptions[appState.comparisonImage][1]
    : imageOptions.display[1];

  const handleImageChoice = selected => {
    setPermanent({ comparisonImage: selected });
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

  const handleDownloadChoice = e => {
    if (e.target.checked) {
      dispatch({ type: "add", payload: match.id });
    } else {
      dispatch({ type: "remove", payload: match.id });
    }
  };

  return (
    <>
      <p>
        <Checkbox
          onChange={handleDownloadChoice}
          checked={state.selected.includes(match.id)}
        >
          Select for Download{" "}
        </Checkbox>
      </p>
      <Row gutter={16}>
        {maskOpen && (
          <Col md={12}>
            <Row style={{ height: "2.2em" }} />
            <ImageDisplay
              meta={mask}
              ref={maskRef}
              src={mask.imageURL}
              alt="Mask for search"
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
              value={imageOptions[appState.comparisonImage]}
              style={{ width: 200 }}
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
            alt="Search Match"
            isMask={false}
            onShow={() => setMaskOpen(true)}
            setIsCopying={setIsCopying}
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
