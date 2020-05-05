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
  InputNumber,
  Button,
  message
} from "antd";
import { QuestionOutlined } from "@ant-design/icons";
import { AppContext } from "../containers/AppContext";
import { FilterContext } from "../containers/FilterContext";
import LineSummary from "./LineSummary";
import MatchSummary from "./MatchSummary";
import SkeletonSummary from "./SkeletonSummary";
import MatchModal from "./MatchModal";
import HelpDrawer from "./HelpDrawer";
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
  const [filterState, setFilterState] = useContext(FilterContext);

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

  function handleHelp() {
    setAppState({ ...appState, showHelp: !appState.showHelp });
  }

  function handleResultsPerLine(count) {
    setFilterState({ ...filterState, resultsPerLine: count });
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
          const currentScore = result.attrs["Matched pixels"];
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
          .sort((a, b) => b.attrs["Matched pixels"] - a.attrs["Matched pixels"])
          .slice(0, resultsPerLine)
      );

      limitedByLineCount.forEach(lines => {
        lines.forEach(line => incrementLibCount(line.attrs.Library));
      });

      // remove the filtered libraries
      const filteredByLibrary = limitedByLineCount.filter(
        result => !(result[0].attrs.Library in filterState.filteredLibraries))

      fullList = [].concat(...filteredByLibrary);
    } else {
      fullList = matchMeta.results
        .filter(result => !(result.attrs.Library in filterState.filteredLibraries))
        .sort((a, b) => {
        return b.attrs["Matched pixels"] - a.attrs["Matched pixels"];
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
            <Col sm={24} lg={4}>
              <h3>
                {searchType === "lines" ? "LM to EM" : "EM to LM"} Matches{" "}
                <Button
                  size="small"
                  shape="circle"
                  icon={<QuestionOutlined />}
                  onClick={handleHelp}
                />
              </h3>
            </Col>
            <Col lg={13} style={{ textAlign: "center" }}>
              <Pagination
                current={page}
                pageSize={matchesPerPage}
                onShowSizeChange={handleChangePageSize}
                pageSizeOptions={[10, 30, 50, 100]}
                onChange={handlePageChange}
                total={fullList.length}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} matches`
                }
              />
            </Col>
            <Col lg={5} style={{ textAlign: "left" }}>
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
          <MatchModal
            isLM={!(searchType === "lines")}
            open={modalOpen}
            setOpen={setModalOpen}
            matchesList={fullList}
            mask={matchInput}
          />
        </>
      )}
      <HelpDrawer>
        {searchType === "lines" ? (
          <h3>LM to EM Matches:</h3>
        ) : (
          <div>
            <h3>EM to LM Matches:</h3>
            <p>
              All matching images in a line are sorted together by the highest
              scoring image in that line. By default, we display a single image
              per line. This can be adjusted in the &ldquo;results per
              line&rdquo; textbox at the top of the results grid.
            </p>
            <div>
              <InputNumber
                style={{ width: "5em" }}
                min={1}
                max={100}
                value={resultsPerLine}
                onChange={handleResultsPerLine}
              />{" "}
              results per line
            </div>
          </div>
        )}
      </HelpDrawer>
    </div>
  );
}

Matches.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired
};
