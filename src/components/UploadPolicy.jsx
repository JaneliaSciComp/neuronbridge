import React from "react";
import PropTypes from "prop-types";

const policyText =
  "By uploading data to the NeuronBridge alignment and search service, you acknowledge that the data will be converted to a MIP of the aligned image. The image stacks, aligned MIP image and any other derived data will only be accessible to you, under your personal login, and the HHMI Janelia developers for maintenance purposes until you delete the search. The data is not accessed by Janelia personnel for any other reason. You further acknowledge that this service is free and HHMI, its employees, and officers accept no liability for its use and do not guarantee or warrant the accuracy or utility of the output.";

export default function UploadPolicy({ textOnly }) {
  if (textOnly) {
    return <p>{policyText}</p>;
  }
  return (
    <div>
      <h3>Uploaded Data Usage and Retention Policy</h3>
      <p>{policyText}</p>
    </div>
  );
}

UploadPolicy.propTypes = {
  textOnly: PropTypes.bool,
};

UploadPolicy.defaultProps = {
  textOnly: false,
};
