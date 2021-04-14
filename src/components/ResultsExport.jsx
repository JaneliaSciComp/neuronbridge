import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import { Badge } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useMatches } from "../containers/MatchesContext";

export default function ResultsExport({ results, searchType }) {
  const { state } = useMatches();
  const name = searchType === "lines" ? "Body Id" : "Line Name";

  const headers = [
    { label: "Number", key: "position" },
    { label: name, key: "publishedName" },
    { label: "Score", key: "normalizedScore" },
    { label: "Matched Pixels", key: "matchingPixels" },
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

  const selectedResults =
    state.selected.length <= 0
      ? resultsWithPosition
      : resultsWithPosition.filter(result =>
          state.selected.includes(result.id)
        );

  return (
    <Badge style={{ backgroundColor: "#008b94" }} count={selectedResults.length}>
      <CSVLink
        data={selectedResults}
        filename="results.csv"
        className="ant-btn"
        headers={headers}
      >
        <DownloadOutlined /> Download
      </CSVLink>
    </Badge>
  );
}

ResultsExport.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchType: PropTypes.string.isRequired
};
