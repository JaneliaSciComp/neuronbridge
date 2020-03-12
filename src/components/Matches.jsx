import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import config from "../config";

export default function Matches(props) {
  const { matchId } = props;
  const [matchMeta, setMatchMeta] = useState(null);

  const getMatches = () => {
    const path = `${config.MATCH_PATH}${matchId}.json`;
    fetch(path)
      .then(response => response.json())
      .then(json => setMatchMeta(json))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getMatches();
  }, [matchId]);

  if (matchMeta) {
    return (
      <div>
        <h3>Matches</h3>
        <p>{matchMeta.results[0].attrs.Library}</p>
      </div>
    );
  }
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

Matches.propTypes = {
  matchId: PropTypes.number.isRequired
};
