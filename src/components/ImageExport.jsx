import React from "react";
import PropTypes from "prop-types";
import { Auth, API, Storage } from "aws-amplify";
import { Popover } from "antd";
import config from "../config";

const { ZIP_DOWNLOAD_LIMIT = 200 } = config;

export default function ImageExport({
  ids,
  isFiltered,
  searchId,
  onChange,
  precomputed,
  searchAlgorithm
}) {
  const limitedIds = ids.slice(0, ZIP_DOWNLOAD_LIMIT);

  const handleDownload = e => {
    e.preventDefault();
    onChange(true);
    Auth.currentCredentials()
      .then(async () => {
        API.post("SearchAPI", "/create_download", {
          body: {
            ids: limitedIds,
            searchId,
            precomputed,
            algo: searchAlgorithm
          }
        })
          .then(response => {
            // redirect back to search progress page.
            const downloadOptions = {
              expires: 500,
              level: "public",
              bucket: response.bucket,
              // download: true,
              customPrefix: {
                public: ""
              }
            };
            Storage.get(response.download, downloadOptions)
              .then(result => {
                onChange(false);
                window.location = result;
              })
              .catch(() => {
                onChange(false);
              });
          })
          .catch(() => {
            onChange(false);
          });
      })
      .catch(() => {
        onChange(false);
      });
  };

  const popContent = (
    <div>
      <p>Downloads are limited to the first {ZIP_DOWNLOAD_LIMIT} images selected</p>
    </div>
  );

  const downloadLink = (
    <a href="/" onClick={handleDownload}>
      {isFiltered ? "Selected" : "All"} Images
    </a>
  );

  if (ids.length > ZIP_DOWNLOAD_LIMIT) {
    return (
      <Popover placement="bottomLeft" content={popContent} title="Download limits">
        {downloadLink}
      </Popover>
    );
  }
  return downloadLink;
}

ImageExport.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFiltered: PropTypes.bool.isRequired,
  searchId: PropTypes.string.isRequired,
  searchAlgorithm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  precomputed: PropTypes.bool.isRequired
};
