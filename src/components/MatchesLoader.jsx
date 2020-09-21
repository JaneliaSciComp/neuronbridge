import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Spin, Divider, message } from "antd";
import LineSummary from "./LineSummary";
import SkeletonSummary from "./SkeletonSummary";
import Matches from "./Matches";
import config from "../config";
import { AppContext } from "../containers/AppContext";

export default function MatchesLoader({ searchResult, searchType }) {
  const [isLoading, setLoading] = useState(false);
  const [matchMeta, setMatchMeta] = useState(null);
  const [appState] = useContext(AppContext);
  const { matchId } = useParams();

  useEffect(() => {
    function getMatches() {
      setLoading(true);
      const bucketUrl = `https://${config.s3.BUCKET}.s3.amazonaws.com/${appState.paths.precomputedDataRootPath}`;
      const path = `${bucketUrl}/metadata/cdsresults/${matchId}.json`;
      fetch(path)
        .then(response => response.json())
        .then(json => {
          const urlFixedResults = json.results.map(result => {
            const fullImageUrl = `${appState.paths.imageryBaseURL}/${result.imageURL}`;
            const fullThumbUrl = `${appState.paths.thumbnailsBaseURLs}/${result.thumbnailURL}`;
            return {
              ...result,
              imageURL: fullImageUrl,
              thumbnailURL: fullThumbUrl
            };
          });
          setMatchMeta({ ...json, results: urlFixedResults });
          setLoading(false);
        })
        .catch(() => {
          message.error("Unable to load matches from the server");
          setLoading(false);
        });
    }

    if ("precomputedDataRootPath" in appState.paths) {
      getMatches();
    }
  }, [matchId, appState.paths, searchResult]);

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
