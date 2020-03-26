import React from "react";
import PropTypes from "prop-types";
import { Spin, Divider, Typography } from "antd";
import LineResult from "./LineResult";
import SkeletonResult from "./SkeletonResult";

const { Title, Text } = Typography;

export default function SearchResults(props) {
  const { searchResult, searchType } = props;

  if (searchResult) {
    const { results, error } = searchResult;
    if (error) {
      if (error.message === "No results found.") {
        const altSearchType = (searchType === 'lines') ? 'electron' : 'light';

        return (
          <div className="results">
            <Title level={3}>No results found for that search. Did you mean to search the <Text type="warning">{altSearchType} microscopy</Text> data?</Title>
          </div>
        );
      }
      return (
        <div className="results">
          <p>Search returned an error</p>
        </div>
      );
    }

    const resultsList = results.map(result => {
      if (searchType === "lines") {
        return (
          <React.Fragment key={result.id}>
            <LineResult metaInfo={result} key={result.id} />
            <Divider dashed />
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={result.id}>
          <SkeletonResult metaInfo={result} key={result.id} />
          <Divider dashed />
        </React.Fragment>
      );
    });

    return (
      <div className="results">
        <p>
          Results 1 - {resultsList.length} of {resultsList.length}
        </p>
        {resultsList}
      </div>
    );
  }
  return (
    <div className="results">
      <Spin tip="Loading..." size="large" />
    </div>
  );
}

SearchResults.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchType: PropTypes.string
};

SearchResults.defaultProps = {
  searchType: "lines"
};
