import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { maskAndSearch } from "../../libs/awsLib";

export default function MaskSearchButton(props) {
  const { isCopying, setIsCopying, src } = props;
  const history = useHistory();

  const handleSearch = async () => {
    setIsCopying(true);
    // copy the files
    const params = {
      imageURL: src,
      thumbnailURL: src
    };
    const response = await maskAndSearch(params);
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
  );
}

MaskSearchButton.propTypes = {
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};
