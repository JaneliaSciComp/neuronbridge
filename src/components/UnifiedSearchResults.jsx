import React from "react";
import PropTypes from "prop-types";
import { Spin, Divider, Typography } from "antd";
import LineResult from "./LineResult";
import SkeletonResult from "./SkeletonResult";
import NoSearch from "./NoSearch";

const { Title } = Typography;

export default function UnifiedSearchResults(props) {
  const { linesResult, skeletonsResult } = props;

  if (linesResult && skeletonsResult) {
    const { results: lineEntries } = linesResult;
    const { results: skeletonEntries } = skeletonsResult;

    const resultsList = [
      ...lineEntries.map(result => {
        return (
          <React.Fragment key={result.id}>
            <LineResult metaInfo={result} key={result.id} />
            <Divider dashed />
          </React.Fragment>
        );
      }),
      ...skeletonEntries.map(result => {
        return (
          <React.Fragment key={result.id}>
            <SkeletonResult metaInfo={result} key={result.id} />
            <Divider dashed />
          </React.Fragment>
        );
      })
    ];

    if (resultsList.length < 1) {
      return (
        <div className="results">
          <Title level={3}>No results found.</Title>
          <NoSearch />
        </div>
      );
    }

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

UnifiedSearchResults.propTypes = {
  linesResult: PropTypes.object.isRequired,
  skeletonsResult: PropTypes.object.isRequired
};
