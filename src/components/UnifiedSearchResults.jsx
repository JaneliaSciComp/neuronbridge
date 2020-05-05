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
      ...lineEntries
        .sort((a, b) =>
          a.attrs["Published Name"].localeCompare(
            b.attrs["Published Name"],
            undefined,
            { numeric: true, sensitivity: "base" }
          )
        )
        .map(result => {
          console.log(result.attrs["Published Name"]);
          const key = `${result.id}_${result.attrs["Slide Code"]}_${result.attrs.Channel}`;
          return (
            <React.Fragment key={key}>
              <LineResult metaInfo={result} key={result.id} />
              <Divider dashed />
            </React.Fragment>
          );
        }),
      ...skeletonEntries
        .sort((a, b) =>
          a.attrs["Body Id"].localeCompare(b.attrs["Body Id"], undefined, {
            numeric: true,
            sensitivity: "base"
          })
        )

        .map(result => {
          const key = `${result.id}_${result.attrs["Body Id"]}`;
          return (
            <React.Fragment key={key}>
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
