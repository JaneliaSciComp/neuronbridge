import React, { useState } from "react";
import PropTypes from "prop-types";
import { Spin, Divider, Typography, Pagination } from "antd";
import LineResult from "./LineResult";
import SkeletonResult from "./SkeletonResult";
import NoSearch from "./NoSearch";

const { Title } = Typography;

export default function UnifiedSearchResults(props) {

  const [page, setPage] = useState(1);
  const [matchesPerPage, setMatchesPerPage] = useState(30);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handleChangePageSize(current, size) {
    setMatchesPerPage(size);
    setPage(1);
  }

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

    const paginatedList = resultsList.slice(
      page * matchesPerPage - matchesPerPage,
      page * matchesPerPage
    );

    return (
      <div className="results">
        <Pagination
          current={page}
          pageSize={matchesPerPage}
          onShowSizeChange={handleChangePageSize}
          pageSizeOptions={[10, 30, 50, 100]}
          onChange={handlePageChange}
          total={resultsList.length}
          showTotal={(total, range) =>
            `Results ${range[0]}-${range[1]} of ${total}`
          }
        />
        {paginatedList}
         <Pagination
          current={page}
          pageSize={matchesPerPage}
          onShowSizeChange={handleChangePageSize}
          pageSizeOptions={[10, 30, 50, 100]}
          onChange={handlePageChange}
          total={resultsList.length}
          showTotal={(total, range) =>
            `Results ${range[0]}-${range[1]} of ${total}`
          }
        />

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
