import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Upload, message, Card, Button } from "antd";
import { HashLink as Link } from "react-router-hash-link";
import { faCloudUploadAlt } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v1 as uuidv1 } from "uuid";
import { Auth, Storage } from "aws-amplify";
import SearchUploadMeta from "./SearchUploadMeta";
import UploadPolicy from "./UploadPolicy";
import { AppContext } from "../containers/AppContext";
import config from "../config";
import "./SearchUpload.css";

const { Dragger } = Upload;

function uploadToS3(upload, handleUpload) {
  if (
    config.fathomEventKeys &&
    Object.prototype.hasOwnProperty.call(window, "fathom")
  ) {
    // make sure the fathom code has been loaded and not blocked by an ad blocker.
    if (window.fathom) {
      window.fathom.trackGoal(config.fathomEventKeys.imageUpload, 0);
    }
  }
  Auth.currentCredentials().then(() => {
    Storage.put(`${upload.filename}/${upload.file.name}`, upload.file, {
      progressCallback: (progress) => {
        const percent = (progress.loaded * 100) / progress.total;
        upload.onProgress({ percent });
      },
      contentType: upload.file.type,
      level: "private",
      bucket: config.SEARCH_BUCKET,
      tagging: "LIFECYCLE=DELETE",
    })
      .then((result) => {
        handleUpload(upload);
        upload.onSuccess(result);
      })
      .catch((e) => {
        console.error(e)
        upload.onError(e)
      });
  });
}

export default function SearchUpload({ uploadedFile, handleUpload }) {
  const { appState, setPermanent } = useContext(AppContext);
  const customRequest = (upload) => {
    // get the image dimensions for use later when checking if the image looks
    // like a VNC or brain image.
    const img = new Image();
    img.src = window.URL.createObjectURL(upload.file);
    img.onload = () => {
      const updatedUpload = upload;
      updatedUpload.width = img.naturalWidth;
      updatedUpload.height = img.naturalHeight;
      window.URL.revokeObjectURL(img.src);
      uploadToS3(updatedUpload, handleUpload);
    };
    img.onerror = () => {
      uploadToS3(upload, handleUpload);
    };
  };

  const uploadDimensions = Object.entries(appState.dataConfig.anatomicalAreas)
    .map(([label]) => (
      <p key={label}>
        {label}: {config.uploadDimensions[label.toLowerCase()]}
      </p>
    ))
    .filter((region) => region);
  function onRemove() {
    Auth.currentCredentials().then(() => {
      Storage.remove(`${uploadedFile.filename}/${uploadedFile.file.name}`, {
        level: "private",
        bucket: config.SEARCH_BUCKET,
      })
        .then(() => {
          handleUpload(null);
        })
        .catch((e) =>
          message.error({
            duration: 0,
            content: e,
            key: "uploaderror",
            onClick: () => message.destroy("uploaderror"),
          }),
        );
    });
  }

  // generate unique id and place it in the name prop of the
  // Dragger component. This way we can use that to name the upload
  // directory something other than the fc-<uid> name currently used.

  const stackHelp = (
    <Card
      title="Unaligned Image Stack"
      className="upload-help-card"
      style={{ height: "100%" }}
    >
      <p>
        Upload an unaligned confocal stack to have NeuronBridge attempt to align
        it for you.
      </p>
      <b>Supported file formats:</b>
      <p>
        Fiji/ImageJ multi-channels .tif/.zip (hyperstack), .lsm, .oib, .czi with
        a single sample, and .nd2. The <i>.nrrd</i> format is not supported due
        to its single channel limitation.
      </p>
    </Card>
  );

  const cdmHelp = (
    <Card
      title="Aligned Color Depth MIP"
      className="upload-help-card"
      style={{ height: "100%" }}
    >
      <p>
        Upload an aligned and masked Color Depth MIP to proceed directly to the
        search.
      </p>
      <b>Uploaded CDM images are expected to be aligned as follows:</b>
      {uploadDimensions}
    </Card>
  );

  const uploadHelp = appState.dataConfig.disableAlignment ? (
    <div style={{ padding: "0.5em 1em" }}>{cdmHelp}</div>
  ) : (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        justifyContent: "center",
        gap: "1em",
        padding: "0.5em 1em",
      }}
    >
      <div style={{ flex: "1 1 320px" }}>{stackHelp}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <b>OR</b>
      </div>
      <div style={{ flex: "1 1 320px" }}>{cdmHelp}</div>
    </div>
  );

  return (
    <div className="uploader">
      {!uploadedFile ? (
        <p>
          Search NeuronBridge color depth MIP collections with your own data
          files by uploading them here.
        </p>
      ) : (
        ""
      )}
      {appState.uploadAccepted && !uploadedFile ? (
        <>
          <p>
            Uploaded data is subject to the{" "}
            <Link to="/upload-policy">
              Uploaded Data Usage and Retention Policy
            </Link>
            .
          </p>
          <Dragger
            name={uuidv1()}
            action=""
            withCredentials
            listType="picture"
            customRequest={customRequest}
            showUploadList={{ showRemoveIcon: false }}
          >
            <p className="ant-upload-drag-icon">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="5x" />
            </p>
            <p className="ant-upload-text">
              Upload a file by clicking here or dragging it to this area.
            </p>
            {appState.dataConfig.loaded ? uploadHelp : ""}
          </Dragger>
        </>
      ) : (
        ""
      )}
      {!appState.uploadAccepted ? (
        <Card title="Please click to accept the following agreement before uploading">
          <UploadPolicy textOnly />
          <Button
            type="primary"
            onClick={() => setPermanent({ uploadAccepted: true })}
          >
            Accept
          </Button>
        </Card>
      ) : (
        ""
      )}
      <SearchUploadMeta
        uploadedFile={uploadedFile}
        onSearchSubmit={() => handleUpload(null)}
        onCancel={() => onRemove()}
      />
      {!appState.uploadAccepted ? (
        ""
      ) : (
        <center>
          <p>
            <Link
              to="/help#upload_alignment"
              scroll={(el) => {
                el.scrollIntoView(true);
              }}
            >
              Additional help
            </Link>
          </p>
        </center>
      )}
    </div>
  );
}

SearchUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  uploadedFile: PropTypes.object,
};

SearchUpload.defaultProps = {
  uploadedFile: null,
};
