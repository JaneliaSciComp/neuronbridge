import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Divider, message } from "antd";
import LineSummary from "./LineSummary";
import MatchSummary from "./MatchSummary";
import MatchModal from "./MatchModal";
import config from "../config";

export default function Matches(props) {
  const { searchResult } = props;
  const { results } = searchResult;

  const { matchId } = useParams();
  const [matchMeta, setMatchMeta] = useState(null);
  const [modalOpen, setModalOpen] = useState(0);

  useEffect(() => {
    function getMatches() {
      const path = `${config.MATCH_PATH}${matchId}.json`;
      fetch(path)
        .then(response => response.json())
        .then(json => setMatchMeta(json))
        .catch(() => message.error('Unable to load matches from the server'));
    }

    getMatches();
  }, [matchId, searchResult]);

  const matchInput = results.filter(result => result.id === matchId)[0];

  let matchesList = [];
  let matchSummaries = [];

  if (matchMeta) {
    matchesList = matchMeta.results.sort((a, b) => {
      return b.attrs.Score - a.attrs.Score;
    });

    matchSummaries = matchesList.map((result, index) => {
      return (
        <MatchSummary
          match={result}
          key={result.matchedId}
          showModal={() => setModalOpen(index + 1)}
        />
      );
    });
  }

  return (
    <div>
      <LineSummary lineMeta={matchInput} />
      <Divider />
      <h3>
        Matches 1 - {matchesList.length} of {matchesList.length}
      </h3>
      {matchSummaries}
      <MatchModal
        open={modalOpen}
        setOpen={setModalOpen}
        matchesList={matchesList}
        mask={matchInput}
      />
    </div>
  );
}

Matches.propTypes = {
  searchResult: PropTypes.object.isRequired
};
