import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Menu, Button, Dropdown } from "antd";
import {
  SearchOutlined,
  EllipsisOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/pro-regular-svg-icons";
import { maskAndSearch, signedPublicLink } from "../../libs/awsLib";

async function toDataURL(url) {
  const signed = await signedPublicLink(url);
  return fetch(signed,{credentials: 'include'}).then((response) => {
    return response.blob();
  }).then(blob => {
    return URL.createObjectURL(blob);
  });
}

export default function ImageActions({
  src,
  mirrored,
  isPPP,
  canMask,
  isCopying,
  setIsCopying,
  setMirrored
}) {
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

  const handleFlip = () => {
    setMirrored(mState => !mState);
  };

  // TODO: write some logic to determine a better name for the
  // downloaded image.
  const downloadName = "image.png";

  const handleDownload = async () => {
    const a = document.createElement("a");
    a.href = await toDataURL(src);
    a.setAttribute('download', downloadName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };



  const menu = (
    <Menu>
      <Menu.Item onClick={handleDownload}>
        <DownloadOutlined /> Download
      </Menu.Item>
      {isPPP ? (
        ""
      ) : (
        <Menu.Item onClick={handleFlip}>
          <FontAwesomeIcon icon={faRepeat} style={{ marginRight: "0.5em" }} />
          {mirrored ? "Restore" : "Flip"}
        </Menu.Item>
      )}
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

  return (
    <Dropdown overlay={menu}>
      <Button style={{marginLeft: "0.5em"}}>
        <EllipsisOutlined />
      </Button>
    </Dropdown>
  );
}

ImageActions.propTypes = {
  src: PropTypes.string.isRequired,
  mirrored: PropTypes.bool.isRequired,
  isPPP: PropTypes.bool.isRequired,
  canMask: PropTypes.bool.isRequired,
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  setMirrored: PropTypes.func.isRequired
};
