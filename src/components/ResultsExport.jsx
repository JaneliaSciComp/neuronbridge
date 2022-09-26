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
    { label: name, key: "image.publishedName" },
    { label: "Rank", key: "pppmRank" },
    { label: "Score", key: "normalizedScore" },
    { label: "Score", key: "pppmScore" },
    { label: "Matched Pixels", key: "matchingPixels" },
    { label: "Library", key: "image.libraryName" },
    { label: "Channel", key: "image.channel" },
    { label: "Magnification", key: "image.objective" },
    { label: "Slide Code", key: "image.slideCode" },
    { label: "Gender", key: "image.gender" },
    { label: "Alignment Space", key: "image.alignmentSpace" },
    { label: "Mounting Protocol", key: "image.mountingProtocol" },
    { label: "Anatomical Area", key: "image.anatomicalArea" },
    { label: "Neuron Type", key: "image.neuronType" },
    { label: "Neuron Instance", key: "image.neuronInstance" }
  ];

	// we have to unroll the keys from the top level and the ones inside
	// the image key, so that we don't miss any when creating the csv file
	// headers.
  const dataKeys = [...Object.keys(results[0]), ...Object.keys(results[0].image).map(key => `image.${key}`)];

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
