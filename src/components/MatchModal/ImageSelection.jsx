import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Select } from "antd";
import { AppContext } from "../../containers/AppContext";
import ImageDisplay from "./ImageDisplay";
import ImageActions from "./ImageActions";
import MirrorButton from "./MirrorButton";
import ContextMenu from "./ContextMenu";
import { useQuery } from "../../libs/hooksLib";

const { Option } = Select;

function ImageSelection({
  imageOptions,
  isCopying,
  vertical,
  setIsCopying,
  meta,
  index,
  chosenImageId,
  anatomicalRegion,
}) {
  const { appState, setPermanent } = useContext(AppContext);
  const isInput = imageOptions[index].key === "input";
  const { imageType } = imageOptions[index];
  const inputImageType = imageOptions.filter(opt => opt.key === 'input')[0]?.imageType
  let initialMirrored = meta.mirrored;
  // if the image is an EM image and the input is LM
  // or the it is the input image then it should not be mirrored
  if (isInput) {
    initialMirrored = false;
  } else if (imageType === "EM" && inputImageType === "EM") {
    initialMirrored = false;
  }
  const [mirrored, setMirrored] = useState(initialMirrored);

  useEffect(() => {
    setMirrored(initialMirrored);
  },[initialMirrored]);

  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const searchType = meta.files && meta.files.CDMSkel ? "pppm" : "cdm";
  const { imageChoices } = appState;

  const handleImageChoice = (selected) => {
    if (!imageChoices[searchType]) {
      imageChoices[searchType] = {};
    }
    imageChoices[searchType][index] = selected;
    setPermanent({ imageChoices });
    // update the url with the newly chosen value
    const urlImageChoices = (query.get("ic") || "").split("");
    urlImageChoices[index] =
      imageOptions.map((opt) => opt.key).indexOf(selected) || 0;
    // convert the array into a 0 padded string and set it on the "ic"
    // parameter in the query.
    query.set(
      "ic",
      Array.from(urlImageChoices, (item) => item || "0").join("")
    );
    location.search = query.toString();
    history.replace(location);
  };

  const chosenImage = imageOptions[chosenImageId] || {};

  const matchImageURL = chosenImage?.path;
  const selectValue = chosenImage?.key;
  const imageAlt = chosenImage?.desc;
  // Only the color depth MIPs can be used in the CDM search,
  // so only those images should show the 'Mask & Search'
  // button.
  const { canMask } = chosenImage;

  const contextMenu = (
    <ContextMenu
      isPPP={searchType === "ppp"}
      src={matchImageURL}
      mirrored={mirrored}
      canMask={canMask}
      isCopying={isCopying}
      setIsCopying={setIsCopying}
      setMirrored={setMirrored}
      anatomicalRegion={anatomicalRegion}
    />
  );

  return (
    <>
      <div style={{ display: "inline-block", width: "100%" }}>
        <Select
          onChange={handleImageChoice}
          value={selectValue}
          style={{ width: 300, marginRight: "0.5em", marginBottom: "0.5em" }}
          dropdownMatchSelectWidth={false}
        >
          {imageOptions.map((option) => (
            <Option key={option.key} value={option.key}>
              {option.desc}
            </Option>
          ))}
        </Select>
        <ImageActions contextMenu={contextMenu}>
          <MirrorButton mirrored={mirrored} onClick={setMirrored} />
        </ImageActions>
      </div>
      <ImageDisplay
        vertical={vertical}
        key={matchImageURL}
        src={matchImageURL}
        alt={imageAlt}
        mirrored={mirrored}
        contextMenu={contextMenu}
        debug={appState.debug}
      />
    </>
  );
}

ImageSelection.propTypes = {
  imageOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCopying: PropTypes.bool.isRequired,
  vertical: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  chosenImageId: PropTypes.number.isRequired,
  anatomicalRegion: PropTypes.string.isRequired,
};

export default ImageSelection;
