import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tooltip, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatRelative } from "date-fns";
import { Link } from "react-router-dom";
import { deleteSearch, signedLink } from "../../libs/awsLib";

import "./CompleteSearchSummary.css";

export default function CompleteSearchSummary({ search }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const searchLink = `/results/${search.id}`;
  useEffect(() => {
    let uploadUrl = `${search.searchDir}/${search.upload}`;
    if (search.displayableMask) {
      uploadUrl = `${search.searchDir}/${search.displayableMask}`;
    }
    signedLink(uploadUrl).then(result => {
      setThumbnailUrl(result);
    });
  }, [search]);

  return (
    <>
      <img
        className="completeThumbnail"
        src={thumbnailUrl}
        alt={search.upload}
      />
      <Link to={searchLink}>{search.upload} </Link> -{" "}
      {formatRelative(new Date(search.createdOn), new Date())}{" "}
      <Tooltip title="Delete">
        <Button
          danger
          size="small"
          shape="circle"
          onClick={() => deleteSearch(search)}
          icon={<CloseOutlined />}
        />
      </Tooltip>
    </>
  );
}

CompleteSearchSummary.propTypes = {
  search: PropTypes.object.isRequired
};
