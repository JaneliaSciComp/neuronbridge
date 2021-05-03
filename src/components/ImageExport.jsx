import React from "react";
import PropTypes from "prop-types";
import { Auth, API, Storage } from "aws-amplify";

// TODO: This needs to send the ids to a lambda function on AWS that will
// return the .tar file for those images.
export default function ImageExport({ ids, isFiltered, searchId, onChange}) {
  const handleDownload = (e) => {
    e.preventDefault();
    onChange(true);
    try {
      Auth.currentCredentials()
        .then(async () => {
        API.post("DownloadAPI", "/create_download", {
              body: {
                ids,
                searchId
              }
            }).then((response) => {
              // redirect back to search progress page.
              const downloadOptions = {
                expires: 500,
                level: "public",
                bucket: response.bucket,
                // download: true,
                customPrefix: {
                  public: ''
                }
              };
              Storage.get(response.download, downloadOptions).then(result => {
                onChange(false);
                window.location = result;
              });
            });
      });
    } catch (error) {
      onChange(false);
    }

  }

  return (
    <a href="/" onClick={handleDownload}>{isFiltered ? "Selected" : "All"} Images</a>
  );
}

ImageExport.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFiltered: PropTypes.bool.isRequired,
  searchId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
