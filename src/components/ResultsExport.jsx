import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";

export default function ResultsExport({ results, searchType }) {
  const name = searchType === "lines" ? "Body Id" : "Line Name";

  // TODO: create a list of headers that we want to have in the export.
  // loop over the keys in the first result item and if that key exists
  // in the list, then add it to the headers we are going to use.

  let headers = [
    { label: "Number", key: "position" },
    { label: name, key: "publishedName" },
    { label: "Score", key: "normalizedScore" },
    { label: "Matched Pixels", key: "matchingPixels" },
    { label: "Library", key: "libraryName" },
    { label: "Channel", key: "channel" },
    { label: "Magnification", key: "objective" }
  ];

  if (searchType === "ppp") {
    headers = [
      { label: "Number", key: "position" },
      { label: name, key: "publishedName" },
      { label: "Rank", key: "pppRank" },
      { label: "Score", key: "pppScore" },
      { label: "Library", key: "libraryName" }
    ];
  }

  if (searchType !== "lines") {
    headers.push({ label: "Slide Code", key: "slideCode" });
  }

  return (
      <CSVLink
        data={results}
        filename="results.csv"
        headers={headers}
      >
        CSV File
      </CSVLink>
  );
}

ResultsExport.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchType: PropTypes.string.isRequired
};
