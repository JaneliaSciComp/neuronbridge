import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function toDataURL(url) {
  return fetch(url).then((response) => {
    return response.blob();
  }).then(blob => {
    return URL.createObjectURL(blob);
  });
}


export default function DownloadButton ({ style, imageURL, name }) {

  const handleDownload = async () => {
    const a = document.createElement("a");
    a.href = await toDataURL(imageURL);
    a.setAttribute('download', name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Button style={style} onClick={handleDownload}><DownloadOutlined /></Button>
  );
}

DownloadButton.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired
};

DownloadButton.defaultProps = {
  style: {}
};


