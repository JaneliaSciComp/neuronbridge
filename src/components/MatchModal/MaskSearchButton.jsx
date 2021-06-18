import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { maskAndSearch } from "../../libs/awsLib";
import config from "../../config";

export default function MaskSearchButton(props) {
  const { isCopying, setIsCopying, mask } = props;
  const history = useHistory();

  const handleSearch = async () => {
    setIsCopying(true);
    // copy the files
    const params = {
      imageURL: mask.imageURL,
      thumbnailURL: mask.imageURL
    };
    if (mask.searchDir && mask.identityId && mask.searchMask) {
      const imagePath = `https://s3.amazonaws.com/${config.SEARCH_BUCKET}/private/${mask.identityId}/${mask.searchDir}/${mask.searchMask}`;
      params.imageURL = imagePath;
      params.thumbnailURL = imagePath;
    }
    const response = await maskAndSearch(params)
    if (response) {
      // redirect to the search input form
      setIsCopying(false);
      history.push(`/mask-selection/${response.newSearchMeta.id}`);
    }
    setIsCopying(false);
  };



  return (
    <Button
      style={{ marginLeft: "0.5em" }}
      onClick={handleSearch}
      loading={isCopying}
    >
      Mask & Search
    </Button>

  )
};

MaskSearchButton.propTypes = {
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  mask: PropTypes.object.isRequired
};
