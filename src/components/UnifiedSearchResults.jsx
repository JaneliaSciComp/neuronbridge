import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Spin, Divider, Typography, Pagination } from "antd";
import ImageWithModal from "./ImageWithModal";
import LineResult from "./LineResult";
import SkeletonResult from "./SkeletonResult";
import NoSearch from "./NoSearch";
import { useQuery } from "../libs/hooksLib";
import { AppContext } from "../containers/AppContext";

const { Title } = Typography;

export default function UnifiedSearchResults(props) {
  const { appState } = useContext(AppContext);
	const { prefixes } = appState.dataConfig;
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  // get the current page number for the results, but prevent page
  // numbers below 0. Can't set the max value here, but if the user
  // is screwing around with the url, they know what is going to
  // happen.
  const page = Math.max(parseInt(query.get("page") || 1, 10), 1);
  // get the number of matches per page, but set the minimum and
  // maximum values, to prevent someone from changing the url to
  // -1 or 1000
  const matchesPerPage = Math.min(
    Math.max(parseInt(query.get("pc") || 30, 10), 10),
    100
  );

  function handlePageChange(newPage) {
    query.set("page", newPage);
    location.search = query.toString();
    history.push(location);
  }

  function handleChangePageSize(current, size) {
    query.set("pc", size);
    query.set("page", 1);
    location.search = query.toString();
    history.push(location);
  }

  const { linesResult, skeletonsResult } = props;

  if (linesResult && skeletonsResult) {
    const { results: lineEntries } = linesResult;
    const { results: skeletonEntries } = skeletonsResult;

    const resultsList = [
      ...lineEntries
        .sort(
          (a, b) =>
            // sort by line name first
            a.publishedName.localeCompare(b.publishedName, undefined, {
              numeric: true,
              sensitivity: "base"
            }) ||
            // then descending slide code to get most recent slides first.
            b.slideCode.localeCompare(a.slideCode) ||
            // then channel
            a.channel - b.channel
        )
        .map(result => {
          const key = `${result.id}_${result.slideCode}_${result.channel}`;
          return (
            <React.Fragment key={key}>
              <LineResult metaInfo={result} key={result.id}>
                <ImageWithModal
                  thumbSrc={`${prefixes.ColorDepthMipThumbnail}${result.files.ColorDepthMipThumbnail}`}
                  src={`${prefixes.ColorDepthMip}${result.files.ColorDepthMip}`}
                  title={result.publishedName}
                  vertical={result.anatomicalArea === "VNC"}
                />
              </LineResult>
              <Divider dashed />
            </React.Fragment>
          );
        }),
      ...skeletonEntries
        .sort((a, b) =>
          a.publishedName.localeCompare(b.publishedName, undefined, {
            numeric: true,
            sensitivity: "base"
          })
        )

        .map(result => {
          const key = `${result.id}_${result.publishedName}`;
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
