import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Select } from "antd";
import { AppContext } from "../../containers/AppContext";
import ImageDisplay from "./ImageDisplay";
import ImageActions from "./ImageActions";
import { useQuery } from "../../libs/hooksLib";

const { Option } = Select;

function ImageSelection({
  imageOptions,
  isCopying,
  setIsCopying,
  meta,
  index,
  chosenImage
}) {
  const [appState, , setPermanent] = useContext(AppContext);
  const [mirrored, setMirrored] = useState(false);

  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const searchType = meta.files && meta.files.ColorDepthMipSkel ? "ppp" : "cdm";
  const { imageChoices } = appState;

  const handleImageChoice = selected => {
    if (!imageChoices[searchType]) {
      imageChoices[searchType] = {};
    }
    imageChoices[searchType][index] = selected;
    setPermanent({ imageChoices });
    // update the url with the newly chosen value
    const urlImageChoices = (query.get("ic") || "").split("");
    urlImageChoices[index] = imageOptions.map(opt => opt.key).indexOf(selected) || 0;
    // convert the array into a 0 padded string and set it on the "ic"
    // parameter in the query.
    query.set("ic", Array.from(urlImageChoices, item => item || "0").join(""));
    location.search = query.toString();
    history.replace(location);
  };

  const matchImageURL = chosenImage.path;
  const selectValue = chosenImage.key;
  const imageAlt = chosenImage.desc;
  // Only the color depth MIPs can be used in the CDM search,
  // so only those images should show the 'Mask & Search'
  // button.
  const { canMask } = chosenImage;

  return (
    <>
      <Select
        onChange={handleImageChoice}
        value={selectValue}
        style={{ width: '80%' }}
      >
        {imageOptions.map(option => (
          <Option key={option.key} value={option.key}>
            {option.desc}
          </Option>
        ))}
      </Select>
      <ImageActions
        isPPP={searchType === "ppp"}
        src={matchImageURL}
        mirrored={mirrored}
        canMask={canMask}
        isCopying={isCopying}
        setIsCopying={setIsCopying}
        setMirrored={setMirrored}
      />
      <ImageDisplay
        src={matchImageURL}
        alt={imageAlt}
        mirrored={mirrored}
      />
    </>
  );
}

ImageSelection.propTypes = {
  imageOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  chosenImage: PropTypes.object.isRequired,
};

export default ImageSelection;
