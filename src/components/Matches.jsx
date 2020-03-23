import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Pagination, Divider, Spin, message } from "antd";
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

  function handleModalOpen(index) {
    const matchPosition = ((page * matchesPerPage) - matchesPerPage) + index + 1;
    setModalOpen(matchPosition);
  }

  const matchInput = results.filter(result => result.id === matchId)[0];

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
    fullList = matchMeta.results.sort((a, b) => {
      return b.attrs.Score - a.attrs.Score;
    });
    pageinatedList = fullList.slice(page * matchesPerPage - matchesPerPage, page * matchesPerPage);

    matchSummaries = pageinatedList.map((result, index) => {
      return (
        <MatchSummary
          match={result}
          key={`${result.matchedId}_${result.attrs.Score}`}
          showModal={() => handleModalOpen(index)}
        />
      );
    });
  }

  return (
    <div>
      {summary}
      <Divider />
      {isLoading && (
        <div className="searchLoader">
          <Spin size="large" />
        </div>
      )}
      {!isLoading && matchMeta && (
        <>
          <h3>
            Matches {(page * matchesPerPage - matchesPerPage) + 1} - {page * matchesPerPage} of {matchMeta.results.length}
            <Pagination current={page} pageSize={matchesPerPage} onChange={handlePageChange} total={matchMeta.results.length} />
          </h3>
          {matchSummaries}
          <MatchModal
            maskType={searchType}
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
