import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Divider, Spin, message } from "antd";
import LineSummary from "./LineSummary";
import MatchSummary from "./MatchSummary";
import SkeletonSummary from "./SkeletonSummary";
import MatchModal from "./MatchModal";
import config from "../config";

export default function Matches(props) {
  const { searchResult, searchType } = props;
  const { results } = searchResult;

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
  const matchInput = results.filter(result => result.id === matchId)[0];

  let matchesList = [];
  let matchSummaries = [];

  const summary =
    searchType === "lines" ? (
      <LineSummary lineMeta={matchInput}/>
    ) : (
      <SkeletonSummary metaInfo={matchInput}/>
    );
  if (matchMeta) {
    matchesList = matchMeta.results.sort((a, b) => {
      return b.attrs.Score - a.attrs.Score;
    });

    matchSummaries = matchesList.map((result, index) => {
      return (
        <MatchSummary
          match={result}
          key={`${result.matchedId}${result.attrs["Matched slices"]}`}
          showModal={() => setModalOpen(index + 1)}
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
      {!isLoading && (
        <>
          <h3>
            Matches 1 - {matchesList.length} of {matchesList.length}
          </h3>
          {matchSummaries}
          <MatchModal
            maskType={searchType}
            open={modalOpen}
            setOpen={setModalOpen}
            matchesList={matchesList}
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
