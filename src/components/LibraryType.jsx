import React from "react";
import PropTypes from "prop-types";
import LibraryFormatter from "./LibraryFormatter";

export default function LibraryType(props) {
  const { type } = props;
  return (
    <p>
      <b>Library: </b>
        <LibraryFormatter type={type}/>
    </p>
  );
}

LibraryType.propTypes = {
  type: PropTypes.string.isRequired
};
