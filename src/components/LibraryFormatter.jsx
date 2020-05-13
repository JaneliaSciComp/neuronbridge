import React from "react";
import PropTypes from "prop-types";
import "./LibraryFormatter.css";

export default function LibraryFormatter(props) {
  const { type } = props;
  const convertedType = type
    .replace(/_/g, " ")
    .replace(/split-?gal4/i, "Split-GAL4")
    .replace(/flylight/i, "FlyLight")
    .replace(/flyem/i, "FlyEM")
    .replace(/\bmcfo\b/i, "MCFO");
  return <span className="allCaps">{convertedType}</span>;
}

LibraryFormatter.propTypes = {
  type: PropTypes.string.isRequired
};
