import React from "react";
import PropTypes from "prop-types";

// TODO: This needs to send the ids to a lambda function on AWS that will
// return the .tar file for those images.
export default function ImageExport({ ids, isFiltered}) {
  const handleDownload = (e) => {
    e.preventDefault();
    console.info('contact AWS with the following ids');
    console.log(ids);
  }

  return (
    <a href="/" onClick={handleDownload}>{isFiltered ? "Selected" : "All"} Images</a>
  );
}

ImageExport.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFiltered: PropTypes.bool.isRequired
};
