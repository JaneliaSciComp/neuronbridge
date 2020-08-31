import React from "react";
import PropTypes from "prop-types";
import { Upload, message } from "antd";
import { faCloudUploadAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v1 as uuidv1 } from "uuid";
import { Auth, Storage } from "aws-amplify";
import SearchUploadMeta from "./SearchUploadMeta";
import config from "../config";
import "./SearchUpload.css";

const { Dragger } = Upload;

export default function SearchUpload({ uploadedFile, handleUpload }) {
  function customRequest(upload) {
    Auth.currentCredentials().then(() => {
      Storage.put(`${upload.filename}/${upload.file.name}`, upload.file, {
        progressCallback: progress => {
          const percent = (progress.loaded * 100) / progress.total;
          upload.onProgress({ percent });
        },
        contentType: upload.file.type,
        level: "private",
        bucket: config.SEARCH_BUCKET
      })
        .then(result => {
          handleUpload(upload);
          upload.onSuccess(result);
        })
        .catch(e => upload.onError(e));
    });
  }

  function onRemove() {
    Auth.currentCredentials().then(() => {
      Storage.remove(`${uploadedFile.filename}/${uploadedFile.file.name}`, {
        level: "private",
        bucket: config.SEARCH_BUCKET
      })
        .then(() => {
          handleUpload(null);
        })
        .catch(e => message.error(e));
    });
  }

  // generate unique id and place it in the name prop of the
  // Dragger component. This way we can use that to name the upload
  // directory something other than the fc-<uid> name currently used.

  return (
    <div className="uploader">
      {!uploadedFile && (
        <Dragger
          name={uuidv1()}
          action=""
          withCredentials
          listType="picture"
          onRemove={onRemove}
          customRequest={customRequest}
          showUploadList
        >
          <p className="ant-upload-drag-icon">
            <FontAwesomeIcon icon={faCloudUploadAlt} size="5x" />
          </p>
          <p className="ant-upload-text">
            Upload a file by clicking here or dragging it to this area.
          </p>
          <p>
            You can upload an unaligned confocal stack and NeuronBridge will
            attempt to align it for you. Or use a Color Depth MIP to proceed
            directly to the search.
          </p>
        </Dragger>
      )}
      <SearchUploadMeta
        uploadedFile={uploadedFile}
        onSearchSubmit={() => handleUpload(null)}
        onCancel={() => onRemove()}
      />
    </div>
  );
}

SearchUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  uploadedFile: PropTypes.object
};

SearchUpload.defaultProps = {
  uploadedFile: null
};
