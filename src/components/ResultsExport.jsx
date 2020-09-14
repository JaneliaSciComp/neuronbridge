import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { DownloadOutlined } from '@ant-design/icons';

export default function ResultsExport({ results, searchType }) {
  const name = searchType === "lines" ? "Body Id" : "Line Name";
  const headers = [
    { label: "Number", key: "position" },
    { label: name, key: "name" },
    { label: "Score", key: "normalizedScore" },
  ];

  if (searchType !== "lines") {
    headers.push(
      { label: "Slide Code", key: "slideCode" }
    );
  }


  const resultsWithPosition = results.map((result, i) => {
    const updated = result;
    updated.position = i + 1;
    if (searchType !== "lines") {
      updated.slideCode = result.attrs["Slide Code"];
    }
    updated.name = result.attrs["Published Name"] || result.attrs.PublishedName;
    return updated;
  });

  return (
    <CSVLink
      data={resultsWithPosition}
      filename="results.csv"
      className="ant-btn"
      headers={headers}
    >
      <DownloadOutlined />{" "}
      Download
    </CSVLink>
  );
}

ResultsExport.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchType: PropTypes.string.isRequired
};
