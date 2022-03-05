import * as React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { maskAndSearch, toDataURL } from "../../libs/awsLib";

export default function ContextMenu({
  setIsCopying,
  setMirrored,
  src,
  canMask,
  mirrored,
  isCopying,
  anatomicalRegion
}) {
  const history = useHistory();

  const handleSearch = async () => {
    setIsCopying(true);
    // copy the files
    const params = {
      imageURL: src,
      thumbnailURL: src,
      anatomicalRegion
    };
    const response = await maskAndSearch(params);
    if (response) {
      // redirect to the search input form
      setIsCopying(false);
      history.push(`/mask-selection/${response.newSearchMeta.id}`);
    }
    setIsCopying(false);
  };

  const handleFlip = () => {
    setMirrored(mState => !mState);
  };

  const handleDownload = async () => {
    // need to get rid of host string / file path and all the query
    // parameters, so the download name is correct.
    const downloadName = src.split("/").pop().split('?')[0];
    const a = document.createElement("a");
    a.href = await toDataURL(src);
    a.setAttribute("download", downloadName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Menu>
      <Menu.Item onClick={handleDownload}>
        <DownloadOutlined /> Download
      </Menu.Item>
      <Menu.Item onClick={handleFlip}>
        <FontAwesomeIcon icon={faRepeat} style={{ marginRight: "0.5em" }} />
        {mirrored ? "Restore" : "Flip"}
      </Menu.Item>
      {canMask ? (
        <Menu.Item onClick={handleSearch} disabled={isCopying}>
          <SearchOutlined />
          Mask &amp; Search
        </Menu.Item>
      ) : (
        ""
      )}
    </Menu>
  );
}

ContextMenu.propTypes = {
  src: PropTypes.string.isRequired,
  mirrored: PropTypes.bool.isRequired,
  canMask: PropTypes.bool.isRequired,
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  setMirrored: PropTypes.func.isRequired,
  anatomicalRegion: PropTypes.string
};

ContextMenu.defaultProps = {
  anatomicalRegion: 'brain'
}
