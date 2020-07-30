import React, { useState } from "react";
import { Upload, message } from "antd";
import { faCloudUploadAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v1 as uuidv1 } from "uuid";
import { Auth, Storage } from "aws-amplify";
import SearchUploadMeta from "./SearchUploadMeta";
import config from "../config";
import "./SearchUpload.css";

const { Dragger } = Upload;

export default function SearchUpload() {
  const [uploadedFile, setUploadedFile] = useState(null);

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
          setUploadedFile(upload);
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
          setUploadedFile(null);
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
            Start a search by clicking here or draging a file to this area to upload.
          </p>
        </Dragger>
      )}
      <SearchUploadMeta
        uploadedFile={uploadedFile}
        onSearchSubmit={() => setUploadedFile(null)}
				onCancel={() => onRemove()}
      />
    </div>
  );
}
