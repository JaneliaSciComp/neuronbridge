import React from "react";
import PropTypes from "prop-types";
import "./LibraryType.css";

export default function LibraryType(props) {
  const {type} = props;
  const convertedType = type.replace(/flyem/i, 'FlyEM').replace(/_/g, ' ');
  return (
    <p>
      <b>Library: </b><span className="allCaps">{convertedType}</span>
    </p>
  );
}

LibraryType.propTypes = {
  type: PropTypes.string.isRequired
};
