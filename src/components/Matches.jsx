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
  message
} from "antd";
import { AppContext } from "../containers/AppContext";
import LineSummary from "./LineSummary";
import MatchSummary from "./MatchSummary";
import SkeletonSummary from "./SkeletonSummary";
import MatchModal from "./MatchModal";
import config from "../config";

export default function Matches(props) {
  const { searchResult, searchType } = props;
  const { results } = searchResult;

  const matchesPerPage = 30;
  const [page, setPage] = useState(1);

  const { matchId } = useParams();
  const [matchMeta, setMatchMeta] = useState(null);
  const [modalOpen, setModalOpen] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [appState, setAppState] = useContext(AppContext);
  const [resultsPerLine, setResultsPerLine] = useState(2);

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

  function handleResultsPerLine(count) {
    setResultsPerLine(count);
  }

  function handleModalOpen(index) {
    const matchPosition = page * matchesPerPage - matchesPerPage + index + 1;
    setModalOpen(matchPosition);
  }

  const matchInput = results.filter(result => result.id === matchId)[0];

  if (!matchInput) {
    return <p>Loading...</p>;
  }

  let pageinatedList = [];
  let fullList = [];
  let matchSummaries = [];

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
      matchMeta.results.forEach(result => {
        const publishedName = result.attrs["Published Name"];
        const currentScore = result.attrs["Matched pixels"];

        if (publishedName in byLines) {
          byLines[publishedName].score = Math.max(
            parseInt(byLines[publishedName].score, 10),
            currentScore
          );
          byLines[publishedName].channels.push(result);
        } else {
          byLines[publishedName] = {
            score: parseInt(currentScore, 10),
            channels: [result]
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
      fullList = [].concat(...limitedByLineCount);
    } else {
      fullList = matchMeta.results.sort((a, b) => {
        return b.attrs["Matched pixels"] - a.attrs["Matched pixels"];
      });
    }

    pageinatedList = fullList.slice(
      page * matchesPerPage - matchesPerPage,
      page * matchesPerPage
    );

    matchSummaries = pageinatedList.map((result, index) => {
      return (
        <React.Fragment key={`${result.matchedId}_${result.attrs.Score}`}>
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
            <Col sm={24} lg={3}>
              <h3>
                {searchType === "lines" ? "LM to EM" : "EM to LM"} Matches
              </h3>
            </Col>
            <Col lg={14} style={{ textAlign: "center" }}>
              <Pagination
                current={page}
                pageSize={matchesPerPage}
                onChange={handlePageChange}
                total={fullList.length}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} matches`
                }
              />
            </Col>
            <Col lg={4} style={{ textAlign: "right" }}>
              {searchType !== "lines" && (
                <div>
                  <InputNumber
                    style={{width: "5em"}}
                    min={1}
                    max={100}
                    value={resultsPerLine}
                    onChange={handleResultsPerLine}
                  />{" "}
                  results per line
                </div>
              )}
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
    </div>
  );
}

Matches.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired
};
