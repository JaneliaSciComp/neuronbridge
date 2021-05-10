import React from "react";
import PropTypes from "prop-types";

export default function ViewIn3D(props) {
  const {selectedMatch} = props;
  return (
    <>
    <p>Download link for the 3d volume</p>
    <p>VVD viewer instructions for {selectedMatch.id} here!!</p>
    <p>Download the latest release of VVD viewer from <a href="https://github.com/takashi310/VVD_Viewer/releases">github</a></p>
    <p>Instructions on using VVD viewer can be found here</p>
    </>
  )
}

ViewIn3D.propTypes = {
  selectedMatch: PropTypes.object.isRequired
};
