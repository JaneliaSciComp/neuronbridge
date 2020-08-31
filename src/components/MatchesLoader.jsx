import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Spin, Divider, message } from "antd";
import LineSummary from "./LineSummary";
import SkeletonSummary from "./SkeletonSummary";
import Matches from "./Matches";
import config from "../config";

export default function MatchesLoader({ searchResult, searchType }) {
  const [isLoading, setLoading] = useState(false);
  const [matchMeta, setMatchMeta] = useState(null);
  const { matchId } = useParams();

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

  if (isLoading) {
    return (
      <div className="searchLoader">
        <Spin size="large" />
      </div>
    );
  }

  const matchInput = searchResult.results.filter(
    result => result.id === matchId
  )[0];

  const summary =
    searchType === "lines" ? (
      <LineSummary lineMeta={matchInput} />
    ) : (
      <SkeletonSummary metaInfo={matchInput} />
    );

  const matches = matchMeta ? (
    <Matches input={matchInput} searchType={searchType} matches={matchMeta} />
  ) : (
    <Spin size="large" />
  );

  return (
    <>
      <h3>Input Image</h3>
      {summary}
      <Divider />
      {matches}
    </>
  );
}

MatchesLoader.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired
};
