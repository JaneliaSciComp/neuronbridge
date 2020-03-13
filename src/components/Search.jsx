import React, { useEffect, useState } from "react";
import { useRouteMatch, useParams, Route, Switch } from "react-router-dom";
import config from "../config";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import Matches from "./Matches";

function Search() {
  const { searchTerm, searchType } = useParams();
  const [searchResult, setResults] = useState(null);
  const routeMatch = useRouteMatch();

  useEffect(() => {
    setResults(null);

    const s3path =
      searchType === "lines" ? config.LINE_PATH : config.SKELETON_PATH;

    fetch(`${s3path}${searchTerm}.json`)
      .then(response => response.json())
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        setResults({ error });
      });
  }, [searchTerm, searchType]);

  if (searchResult) {
    return (
      <div className="card-container">
        <SearchInput searchTerm={searchTerm} />
        <Switch>
          <Route path={`${routeMatch.path}`} exact>
            <SearchResults searchResult={searchResult} />
          </Route>
          <Route path={`${routeMatch.path}/matches/:matchId`} exact>
            <Matches searchResult={searchResult} />
          </Route>
        </Switch>
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default Search;
