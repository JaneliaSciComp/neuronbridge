import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Spin } from 'antd';
import config from "../config";
import LineResult from "./LineResult";

export default function SearchResults(props) {
  const { searchTerm, searchType } = props;
  const [searchResult, setResults] = useState(null);

  useEffect(() => {
    setResults(null);

    const s3path =
      searchType === "lines" ? config.LINE_PATH : config.SKELETON_PATH;

    fetch(`${s3path}${searchTerm}.json`)
      .then(response => response.json())
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        setResults({ error });
      });
  }, [searchTerm, searchType]);

  if (searchTerm) {
    if (searchResult) {
      const { results, error } = searchResult;
      if (error) {
        return (
          <div className="results">
            <p>{searchTerm}</p>
            <p>Search returned an error</p>
          </div>
        );
      }
      return (
        <div className="results">
          <p>{searchTerm}</p>
          <LineResult metaInfo={results[0]} />
        </div>
      );
    }
    return (
      <div className="results">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }
  return <div className="results" />;
}

SearchResults.propTypes = {
  searchTerm: PropTypes.string,
  searchType: PropTypes.string.isRequired
};

SearchResults.defaultProps = {
  searchTerm: null
};
