import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { signedLink } from "../../libs/awsLib";
import StepTitle from "./StepTitle";

const linkStyle = {
  color: "#fff",
  marginTop: "0.5em",
  width: "150px"
};

export default function MaskSelectionStep({ search, state }) {
  const [maskUrl, setMaskUrl] = useState(null);
  const [isCopying, setIsCopying] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (search.searchMask) {
      const uploadUrl = `${search.searchDir}/${search.searchMask}`;
      signedLink(uploadUrl).then(result => {
        setMaskUrl(result);
      });
    } else {
      setMaskUrl(null);
    }
  }, [search.searchMask, search.searchDir]);

  const copyAlignment = () => {
    setIsCopying(true);
    API.post("SearchAPI", "/copy_alignment", {
      body: {
        searchId: search.id
      }
    })
      .then(response => {
        setIsCopying(false);
        history.push(`/mask-selection/${response.newSearchMeta.id}`);
      })
      .catch(() => setIsCopying(false));
  }

  const maskSelectionURL = `/mask-selection/${search.id}`;
  let content;
  if (state === "active" && !search.searchMask) {
    content = (
      <Link
        to={maskSelectionURL}
        className="ant-btn ant-btn-primary"
        style={linkStyle}
      >
        select mask region
      </Link>
    );
  } else if (state === "complete") {
    const imgClass =
      (search.anatomicalRegion && search.anatomicalRegion === "vnc")
        ? "verticalThumbnail"
        : "completeThumbnail";
    content = (
      <>
        <img className={imgClass} src={maskUrl} alt={search.upload} />
        <br />
        <Button
          style={{ marginTop: "0.5em", width: "150px" }}
          loading={isCopying}
          onClick={copyAlignment}
        >
          re-select mask
        </Button>
      </>
    );
  }

  // the mask selection state never shows as active as the spinning icon
  // suggests that something is loading, when really we are only ever waiting
  // for user input.
  let loaderState = state;
  if (state === "active" && !search.searchMask) {
    loaderState = "complete";
  }
  return (
    <>
      <StepTitle state={loaderState} step={3} text="Search Mask Selection" />
      {content}
    </>
  );
}

MaskSelectionStep.propTypes = {
  search: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired
};
