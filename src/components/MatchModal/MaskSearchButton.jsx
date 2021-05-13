import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { maskAndSearch } from "../../libs/awsLib";
import config from "../../config";

export default function MatchSearchButton(props) {
  const { isCopying, setIsCopying, mask } = props;
  const history = useHistory();

  const handleSearch = async () => {
    setIsCopying(true);
    // copy the files
    const imagePath = `https://s3.amazonaws.com/${config.SEARCH_BUCKET}/private/${mask.identityId}/${mask.searchDir}/${mask.searchMask}`;
    const response = await maskAndSearch({
      imageURL: mask.imageURL || imagePath,
      thumbnailURL: mask.imageURL || imagePath
    });
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

MatchSearchButton.propTypes = {
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  mask: PropTypes.object.isRequired
};
