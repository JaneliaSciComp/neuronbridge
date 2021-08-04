import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { AppContext } from "../../containers/AppContext";
import ImageDisplay from "./ImageDisplay";
import MaskSearchButton from "./MaskSearchButton";
import DownloadButton from "./DownloadButton";
import FlipButton from "./FlipButton";

const { Option } = Select;

function ImageSelection({
  imageOptions,
  isCopying,
  setIsCopying,
  meta,
  index,
  defaultImage,
  mousePosition,
  setMousePosition
}) {
  const [appState, , setPermanent] = useContext(AppContext);
  const [mirrored, setMirrored] = useState(false);

  const searchType = meta.files && meta.files.ColorDepthMipSkel ? "ppp" : "cdm";
  const { imageChoices } = appState;

  const handleImageChoice = selected => {
    if (!imageChoices[searchType]) {
      imageChoices[searchType] = {};
    }
    imageChoices[searchType][index] = selected;
    setPermanent({ imageChoices });
  };

  let matchImageURL = imageOptions[defaultImage][1];
  let selectValue = imageOptions[defaultImage];
  let imageAlt = imageOptions[defaultImage][0];

  // Only the color depth MIPs can be used in the CDM search,
  // so only those images should show the 'Mask & Search'
  // button.
  let canMask = false;

  if (imageChoices[searchType] && imageChoices[searchType][index]) {
    [imageAlt, matchImageURL, canMask] = imageOptions[
      imageChoices[searchType][index]
    ];
    selectValue = imageOptions[imageChoices[searchType][index]];
  }
  let downloadName = "image.png";
  if (meta.displayableMask) {
    downloadName = meta.displayableMask;
  }

  return (
    <>
      <Select
        onChange={handleImageChoice}
        value={selectValue}
        style={{ width: 300 }}
      >
        {Object.keys(imageOptions).map(key => (
          <Option key={key} value={key}>
            {imageOptions[key][0]}
          </Option>
        ))}
      </Select>
      <DownloadButton
        style={{ marginLeft: "0.5em" }}
        imageURL={matchImageURL}
        name={downloadName}
      />
      {canMask ? (
        <MaskSearchButton
          src={matchImageURL}
          isCopying={isCopying}
          setIsCopying={setIsCopying}
        />
      ) : (
        ""
      )}

      <FlipButton isPPP={searchType === "ppp"} mirrored={mirrored} onClick={setMirrored} />
      <ImageDisplay
        src={matchImageURL}
        alt={imageAlt}
        mousePosition={mousePosition}
        mirrored={mirrored}
        setMousePosition={setMousePosition}
      />
    </>
  );
}

ImageSelection.propTypes = {
  imageOptions: PropTypes.object.isRequired,
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  defaultImage: PropTypes.string.isRequired,
  mousePosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  setMousePosition: PropTypes.func.isRequired
};

export default ImageSelection;
