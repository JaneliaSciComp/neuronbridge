import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";

export default function ResultsExport({ results, searchType }) {
  const name = searchType === "lines" ? "Body Id" : "Line Name";

  const headers = [
    { label: "Number", key: "position" },
    { label: name, key: "publishedName" },
    { label: "Score", key: "normalizedScore" },
    { label: "Matched Pixels", key: "matchingPixels"},
    { label: "Library", key: "libraryName" }
  ];

  if (searchType !== "lines") {
    headers.push({ label: "Slide Code", key: "slideCode" });
  }

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
      <DownloadOutlined /> Download
    </CSVLink>
  );
}

ResultsExport.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchType: PropTypes.string.isRequired
};
