import React, { useEffect, useState } from "react";
import { useRouteMatch, useParams, Route, Switch } from "react-router-dom";
import { Spin } from "antd";
import config from "../config";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import Matches from "./Matches";
import "./Search.css";

function Search() {
  const { searchTerm, searchType } = useParams();
  const [searchResult, setResults] = useState(null);
  const [chosenType, setChosenType] = useState("lines");
  const [isLoading, setIsLoading ] = useState(false);
  const routeMatch = useRouteMatch();

  useEffect(() => {
    setResults(null);

    if (!searchTerm) {
      return;
    }

    setIsLoading(true);

    const s3path =
      searchType === "lines" ? config.LINE_PATH : config.SKELETON_PATH;

    fetch(`${s3path}${searchTerm}.json`)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setIsLoading(false);
      })
      .catch(error => {
        setResults({ error });
        setIsLoading(false);
      });
  }, [searchTerm, searchType]);

  return (
    <div>
      <SearchInput
        searchTerm={searchTerm}
        searchType={chosenType}
        setType={setChosenType}
      />
      {isLoading && (
        <div className="searchLoader">
          <Spin size="large"/>
        </div>
      )}
      {(!isLoading && searchResult) && (
      <Switch>
        <Route path={`${routeMatch.path}`} exact>
          <SearchResults searchResult={searchResult} searchType={searchType} />
        </Route>
        <Route path={`${routeMatch.path}/matches/:matchId/:page?`} >
          <Matches searchResult={searchResult} searchType={searchType} />
        </Route>
      </Switch>
      )}
    </div>
  );
}

export default Search;
