import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import { Tooltip } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import StepTitle from "./StepTitle";

function determineUploadType(alignStarted, upload) {
  const fileExtensionRegex = /(?:\.([^.]+))?$/;
  const fileExtension = fileExtensionRegex.exec(upload)[1]?.toLowerCase();
  let errorMessage = null;
  // if we have an alignment start time, then this was supposed to be a
  // 3D stack. However, if the file is a png or jpeg, then it was
  // probably a 2D CDM and the alignment will most likely fail.
  if (alignStarted) {
    let alignFileType = "3D stack";
    if (["png", "jpg", "jpeg"].includes(fileExtension)) {
      alignFileType = "2D CDM";
      errorMessage =
        "It looks like you uploaded a 2D CDM, but intended to run an alignment. Please see the supported file formats in the upload information above.";
    }
    return [alignFileType, errorMessage];
  }

  // if alignment start is not present, then we are expecting a 2D image.
  // and in this case if a .tif, .lsm, .czi, etc file was uploaded, then
  // we probably have a 3D stack and the search will likely fail.
  let fileType = "2D CDM";
  if (["czi", "lsm", "oib", "nd2", "zip"].includes(fileExtension)) {
    fileType = "3D stack";
    errorMessage =
      "It looks like you uploaded a 3D stack, but have opted to skip alignment. Currently, we only support aligned 2D CDM uploads in the CDM search.";
  }
  return [fileType, errorMessage];
}

export default function FileUploadStep({ state, date, alignStarted, upload }) {
  let content = "";
  let typeContent = "";
  const [uploadType, errorMessage] = determineUploadType(alignStarted, upload);

  if (["active", "complete"].includes(state)) {
    if (date) {
      typeContent = `File Type: ${uploadType}`;
      content = `Uploaded ${formatRelative(new Date(date), new Date())}`;
    }
  }

  return (
    <>
      <StepTitle state={state} step={1} text="Files Uploaded" />
      <p style={{ marginTop: "1em" }}>{content}</p>
      <Tooltip title={errorMessage} color="#008b94">
        <p style={{ marginTop: "1em" }}>
          {errorMessage ? <WarningOutlined style={{"color": "red"}} /> : ""}
          {" "}{typeContent}
        </p>
      </Tooltip>
    </>
  );
}

FileUploadStep.propTypes = {
  state: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  upload: PropTypes.string.isRequired,
  alignStarted: PropTypes.bool.isRequired
};
