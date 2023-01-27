import * as React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { maskAndSearch, toDataURL, signedLink } from "../../libs/awsLib";

export default function ContextMenu({
  setIsCopying,
  src,
  canMask,
  isCopying,
  anatomicalRegion
}) {
  const history = useHistory();

  const [downloadSrc, setDownloadSrc] = React.useState();

  React.useEffect(() => {
    if (src && !src.match(/^http/)) {
      signedLink(src).then((result) => {
        setDownloadSrc(result);
      });
    } else {
      setDownloadSrc(src);
    }

  },[src]);


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

  const handleDownload = async () => {
    // need to get rid of host string / file path and all the query
    // parameters, so the download name is correct.
    if (downloadSrc) {
      const downloadName = downloadSrc
        .split("/")
        .pop()
        .split("?")[0];
      const a = document.createElement("a");
      a.href = await toDataURL(downloadSrc);
      a.setAttribute("download", downloadName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Menu>
      <Menu.Item onClick={handleDownload} key="download">
        <DownloadOutlined /> Download
      </Menu.Item>
      {canMask ? (
        <Menu.Item onClick={handleSearch} disabled={isCopying} key="mask">
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
  canMask: PropTypes.bool.isRequired,
  isCopying: PropTypes.bool.isRequired,
  setIsCopying: PropTypes.func.isRequired,
  anatomicalRegion: PropTypes.string
};

ContextMenu.defaultProps = {
  anatomicalRegion: "brain"
};
