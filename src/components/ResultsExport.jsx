import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";

export default function ResultsExport({ results }) {
  const headers = [
    { label: "Number", key: "position" },
    { label: "Line Name", key: "publishedName" },
    { label: "Score", key: "normalizedScore" },
    { label: "Slide Code", key: "slideCode" }
  ];

  const resultsWithPosition = results.map((result, i) => {
    const updated = result;
    updated.position = i + 1;
    return updated;
  });

  return (
    <CSVLink
      data={resultsWithPosition}
      filename="results.csv"
      className="ant-btn"
      headers={headers}
    >
      Download
    </CSVLink>
  );
}

ResultsExport.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired
};
