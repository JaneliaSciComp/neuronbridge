import React from "react";
import PropTypes from "prop-types";
import "./LibraryFormatter.css";
import { libraryFormatter } from "../libs/utils";

export default function LibraryFormatter(props) {
  const { type } = props;
  if (!type) {
    return (
      <span style={{color: "red"}}>type missing in LibraryFormatter</span>
    );
  }
  const convertedType = libraryFormatter(type);
  return <span className="allCaps">{convertedType}</span>;
}

LibraryFormatter.propTypes = {
  type: PropTypes.string.isRequired
};
