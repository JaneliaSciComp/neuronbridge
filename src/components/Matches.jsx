import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  Switch,
  Row,
  Col,
  Pagination,
  Divider,
  Spin,
  Empty,
  message
} from "antd";
import { AppContext } from "../containers/AppContext";
import { FilterContext } from "../containers/FilterContext";
import LineSummary from "./LineSummary";
import MatchSummary from "./MatchSummary";
import SkeletonSummary from "./SkeletonSummary";
import MatchModal from "./MatchModal";
import HelpButton from "./HelpButton";
import FilterMenu from "./FilterMenu";
import FilterButton from "./FilterButton";

import config from "../config";

export default function Matches(props) {
  const { searchResult, searchType } = props;
  const { results } = searchResult;

  const [page, setPage] = useState(1);

  const { matchId } = useParams();
  const [matchMeta, setMatchMeta] = useState(null);
  const [modalOpen, setModalOpen] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [matchesPerPage, setMatchesPerPage] = useState(30);
  const [appState, setAppState] = useContext(AppContext);
  const [filterState] = useContext(FilterContext);

  useEffect(() => {
    function getMatches() {
      setLoading(true);
      const path = `${config.MATCH_PATH}${matchId}.json`;
      fetch(path)
        .then(response => response.json())
        .then(json => {
          setMatchMeta(json);
          setLoading(false);
        })
        .catch(() => {
          message.error("Unable to load matches from the server");
          setLoading(false);
        });
    }

    getMatches();
  }, [matchId, searchResult]);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handleChangePageSize(current, size) {
    setMatchesPerPage(size);
  }

  function handleModalOpen(index) {
    const matchPosition = page * matchesPerPage - matchesPerPage + index + 1;
    setModalOpen(matchPosition);
  }

  const matchInput = results.filter(result => result.id === matchId)[0];
  const resultsPerLine = filterState.resultsPerLine || 1;

  if (!matchInput) {
    return <p>Loading...</p>;
  }

  let pageinatedList = [];
  let fullList = [];
  let matchSummaries = [];
  const countsByLibrary = {};

  function incrementLibCount(library) {
    if (!(library in countsByLibrary)) {
      countsByLibrary[library] = 0;
    }
    countsByLibrary[library] += 1;
  }

  const summary =
    searchType === "lines" ? (
      <LineSummary lineMeta={matchInput} />
    ) : (
      <SkeletonSummary metaInfo={matchInput} />
    );

  if (matchMeta) {
    // if isLM then a more complex sort is required.
    // - convert fullList into a list of lines where each line name
    //   has the max score and  all the channels as an array of children
    //   [
    //     {
    //       PublishedName: String,
    //       Channels: [{},{},{}],
    //       Score: Int <Max Score>
    //     },
    //     {...}
    //   ]
    //
    if (searchType !== "lines") {
      const byLines = {};
      matchMeta.results
        // .filter(result => !(result.attrs.Library in filterState.filteredLibraries))
        .forEach(result => {
          const publishedName =
            result.attrs["Published Name"] || result.attrs.PublishedName;
          const currentScore = result.normalizedScore;
          const library = result.attrs.Library;

          if (publishedName in byLines) {
            byLines[publishedName].score = Math.max(
              parseInt(byLines[publishedName].score, 10),
              currentScore
            );
            byLines[publishedName].channels.push(result);
          } else {
            byLines[publishedName] = {
              score: parseInt(currentScore, 10),
              channels: [result],
              library
            };
          }
        });
      const sortedByLine = Object.values(byLines).sort(
        (a, b) => b.score - a.score
      );
      const limitedByLineCount = sortedByLine.map(line =>
        line.channels
          .sort((a, b) => b.normalizedScore - a.normalizedScore)
          .slice(0, resultsPerLine)
      );

      limitedByLineCount.forEach(lines => {
        lines.forEach(line => incrementLibCount(line.attrs.Library));
      });

      // remove the filtered libraries
      const filteredByLibrary = limitedByLineCount.filter(
        result => !(result[0].attrs.Library in filterState.filteredLibraries)
      );

      fullList = [].concat(...filteredByLibrary);
    } else {
      fullList = matchMeta.results
        .filter(
          result => !(result.attrs.Library in filterState.filteredLibraries)
        )
        .sort((a, b) => {
          return b.normalizedScore - a.normalizedScore;
        });

      matchMeta.results.forEach(line => {
        incrementLibCount(line.attrs.Library);
      });
    }

    pageinatedList = fullList.slice(
      page * matchesPerPage - matchesPerPage,
      page * matchesPerPage
    );

    matchSummaries = pageinatedList.map((result, index) => {
      const key = `${result.matchedId}_${result.attrs.Score}_${result.attrs["Matched pixels"]}_${index}`;
      return (
        <React.Fragment key={key}>
          <MatchSummary
            match={result}
            isLM={!(searchType === "lines")}
            showModal={() => handleModalOpen(index)}
            gridView={appState.gridView}
          />
        </React.Fragment>
      );
    });
  }

  if (appState.gridView) {
    matchSummaries = <Row gutter={16}>{matchSummaries}</Row>;
  }

  if (pageinatedList.length === 0) {
    matchSummaries = (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            There are no results to show. Please try using less restrictive
            filters.
          </span>
        }
      />
    );
  }

  return (
    <div>
      <h3>Input Image</h3>
      {summary}
      <Divider />
      {isLoading && (
        <div className="searchLoader">
          <Spin size="large" />
        </div>
      )}
      {!isLoading && matchMeta && (
        <>
          <Row style={{ paddingBottom: "1em" }}>
            <Col md={24} lg={5}>
              <h3>
                {searchType === "lines" ? "LM to EM" : "EM to LM"} Matches{" "}
                <HelpButton
                  target={
                    searchType === "lines" ? "MatchesLMtoEM" : "MatchesEMtoLM"
                  }
                />
              </h3>
            </Col>
            <Col md={20} lg={14} style={{ textAlign: "center" }}>
              <Pagination
                current={page}
                pageSize={matchesPerPage}
                onShowSizeChange={handleChangePageSize}
                pageSizeOptions={[10, 30, 50, 100]}
                onChange={handlePageChange}
                responsive
                showLessItems
                total={fullList.length}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} matches`
                }
              />
            </Col>
            <Col md={4} lg={3} style={{ textAlign: "center" }}>
              <FilterButton />
            </Col>
            <Col lg={2} style={{ textAlign: "right" }}>
              <Switch
                checked={appState.gridView}
                checkedChildren="Grid"
                unCheckedChildren="List"
                onChange={() =>
                  setAppState({ ...appState, gridView: !appState.gridView })
                }
              />
            </Col>
          </Row>
          <FilterMenu
            searchType={searchType}
            countsByLibrary={countsByLibrary}
          />
          {matchSummaries}
          <Pagination
            current={page}
            pageSize={matchesPerPage}
            onShowSizeChange={handleChangePageSize}
            pageSizeOptions={[10, 30, 50, 100]}
            onChange={handlePageChange}
            responsive
            showLessItems
            total={fullList.length}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} matches`
            }
          />

          <MatchModal
            isLM={!(searchType === "lines")}
            open={modalOpen}
            setOpen={setModalOpen}
            matchesList={fullList}
            mask={matchInput}
          />
        </>
      )}
    </div>
  );
}

Matches.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired
};
