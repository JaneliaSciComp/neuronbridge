import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

export default function SearchUploadMeta({uploadedName}) {

  if (!uploadedName) {
    return null;
  }

  return (
    <div>
      <p>
        Loop over uploaded names and display meta form for each. On submit,
        upload the meta json to s3 for each uploaded image.
      </p>
        <p>{uploadedName}</p>
      <Button size="small">Search</Button>
    </div>
  );
}

SearchUploadMeta.propTypes = {
  uploadedName: PropTypes.string
};

SearchUploadMeta.defaultProps = {
  uploadedName: null
};
