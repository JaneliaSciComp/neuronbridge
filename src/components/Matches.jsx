import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Divider } from "antd";
import LineSummary from "./LineSummary";
import MatchSummary from "./MatchSummary";
import config from "../config";

export default function Matches(props) {
  const { searchResult } = props;
  const { results } = searchResult;
  const { matchId } = useParams();
  const [matchMeta, setMatchMeta] = useState(null);

  const matchInput = results.filter(result => result.id === matchId)[0];
  useEffect(() => {
    function getMatches() {
      const path = `${config.MATCH_PATH}${matchId}.json`;
      fetch(path)
        .then(response => response.json())
        .then(json => setMatchMeta(json))
        .catch(error => console.log(error));
    }

    getMatches();
  }, [matchId, searchResult]);

  let matchesList = <p>Loading...</p>;

  if (matchMeta) {
    matchesList = matchMeta.results.map(result => {
      return <MatchSummary match={result} key={result.matchedId} />;
    });
  }
  return (
    <div>
      <LineSummary lineMeta={matchInput} />
      <Divider />
      <h3>
        Matches 1 - {matchesList.length} of {matchesList.length}
      </h3>
      {matchesList}
    </div>
  );
}

Matches.propTypes = {
  searchResult: PropTypes.object.isRequired
};
