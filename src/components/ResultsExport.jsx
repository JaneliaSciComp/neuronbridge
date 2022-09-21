import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";

export default function ResultsExport({ results, searchType }) {
  const name = searchType === "lines" ? "Body Id" : "Line Name";

  if (results.length < 1) {
    return <span>CSV Link</span>;
  }

  // TODO: create a list of headers that we want to have in the export.
  // loop over the keys in the first result item and if that key exists
  // in the list, then add it to the headers we are going to use.
  const headersList = [
    { label: "Number", key: "position" },
    { label: name, key: "publishedName" },
    { label: "Rank", key: "pppRank" },
    { label: "Score", key: "normalizedScore" },
    { label: "Score", key: "pppScore" },
    { label: "Matched Pixels", key: "matchingPixels" },
    { label: "Library", key: "libraryName" },
    { label: "Channel", key: "channel" },
    { label: "Magnification", key: "objective" },
    { label: "Slide Code", key: "slideCode" },
    { label: "Gender", key: "gender" },
    { label: "Alignment Space", key: "alignmentSpace" },
    { label: "Mounting Protocol", key: "mountingProtocol" },
    { label: "Anatomical Area", key: "anatomicalArea" },
    { label: "Neuron Type", key: "neuronType" },
    { label: "Neuron Instance", key: "neuronInstance" }
  ];

  const dataKeys = Object.keys(results[0]);

  const headers = headersList.map(header => {
    if (dataKeys.includes(header.key)) {
      return header;
    }
    return undefined;
  }).filter(header => header);

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
