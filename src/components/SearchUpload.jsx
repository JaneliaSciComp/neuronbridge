import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import { faCloudUploadAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth, Storage } from "aws-amplify";
import "./SearchUpload.css";

const { Dragger } = Upload;

export default function SearchUpload() {
  const [uploadedNames, setUploadedNames] = useState([]);

  function customRequest(upload) {
    window.foo = upload;

    Auth.currentCredentials().then(() => {
      Storage.put(upload.file.uid, upload.file, {
        progressCallback: progress => {
          const percent = (progress.loaded * 100) / progress.total;
          upload.onProgress({ percent });
        },
        contentType: upload.file.type,
        level: "private",
        bucket: "janelia-neuronbridge-searches-dev"
      })
        .then(result => {
          setUploadedNames(names => {
            return names.concat(result.key);
          });
          upload.onSuccess(result);
        })
        .catch(e => upload.onError(e));
    });
  }

  function onRemove(file) {
    Auth.currentCredentials().then(() => {
      Storage.remove(file.uid, {
        level: "private",
        bucket: "janelia-neuronbridge-searches-dev"
      })
        .then(() => {
          setUploadedNames(names => {
            return names.filter(name => name !== file.uid);
          });
        })
        .catch(e => message.error(e));
    });
  }

  return (
    <div className="uploader">
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
      {uploadedNames.length > 0 && <Button size="small">Search</Button>}
    </div>
  );
}
