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
    const matchPosition = page * matchesPerPage - matchesPerPage + index + 1;
    setModalOpen(matchPosition);
  }

  const matchInput = results.filter(result => result.id === matchId)[0];

  if (!matchInput) {
    return (
      <p>Loading...</p>
    );
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
    fullList = matchMeta.results.sort((a, b) => {
      return b.attrs.Score - a.attrs.Score;
    });
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
          />
          <Divider dashed />
        </React.Fragment>
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
            Matches
            <Pagination
              current={page}
              pageSize={matchesPerPage}
              onChange={handlePageChange}
              total={matchMeta.results.length}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} matches`
              }
            />
          </h3>
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
