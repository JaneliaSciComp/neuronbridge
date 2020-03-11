import React, { useEffect } from "react";
import config from "../config";

export default function Matches() {
  const testId = "2711777429277376523";

  const getMatches = () => {
    if (testId) {
      const path = `${config.MATCH_PATH}${testId}.json`;
      fetch(path)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          console.log(json.results);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getMatches();
  });

  return (
    <div>
      <p>Matches here</p>
    </div>
  );
}
