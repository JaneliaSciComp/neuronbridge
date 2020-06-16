import React, { useState } from "react";
import { Button, Upload } from "antd";
import { faCloudUploadAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth, Storage } from "aws-amplify";
import "./SearchUpload.css";

const { Dragger } = Upload;

export default function SearchUpload() {
  const [uploadVisible, setUploadVisible] = useState(false);

  function toggleUpload() {
    setUploadVisible(current => !current);
  }

  function customRequest(upload) {
    window.foo = upload;

    Auth.currentCredentials().then(() => {
      Storage.put(upload.file.uid, upload.file, {
        progressCallback: progress => {
          const percent = (progress.loaded * 100) / progress.total;
          upload.onProgress({ percent });
        },
        contentType: upload.file.type,
        level: "private"
      })
        .then(result => {
          console.log(result);
          upload.onSuccess(result);
        })
        .catch(e => upload.onError(e));
    });
  }

  function onRemove(file) {
    Auth.currentCredentials().then(() => {
      Storage.remove(file.uid, {
        level: "private"
      })
        .then(result => console.log(result))
        .catch(e => console.log(e));
    });
  }

  return (
    <div className="uploader">
      <p>
        Or{" "}
        <Button size="small" onClick={toggleUpload}>
          upload an image
        </Button>{" "}
        of your own to perform a custom search of our data sets.
      </p>
      {uploadVisible && (
        <Dragger
          name="file"
          multiple
          action=""
          withCredentials
          listType="picture"
          onRemove={onRemove}
          customRequest={customRequest}
        >
          <p className="ant-upload-drag-icon">
            <FontAwesomeIcon icon={faCloudUploadAlt} size="5x" />
          </p>
          <p className="ant-upload-text">
            Click or drag a file to this area to upload.
          </p>
        </Dragger>
      )}
    </div>
  );
}
