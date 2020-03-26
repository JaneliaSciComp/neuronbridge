import React, { useEffect, useState } from "react";
import { useRouteMatch, useParams, Route, Switch } from "react-router-dom";
import { Storage } from "aws-amplify";
import { Spin } from "antd";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import Matches from "./Matches";
import "./Search.css";

function Search() {
  const { searchTerm, searchType } = useParams();
  const [searchResult, setResults] = useState(null);
  const [chosenType, setChosenType] = useState("lines");
  const [isLoading, setIsLoading] = useState(false);
  const routeMatch = useRouteMatch();

  useEffect(() => {
    setResults(null);

    if (!searchTerm) {
      return;
    }

    setIsLoading(true);

    const storageOptions = {
      customPrefix: {
        public: ""
      },
      level: "public",
      download: true
    };

    const s3group = searchType === "lines" ? "by_line" : "by_body";

    Storage.list(`metadata/${s3group}/${searchTerm}`, storageOptions)
      .then(results => {
        if (results.length === 0) {
          throw Error('No results found.');
        }
        const combined = { results: [] };
        results.forEach(result => {
          Storage.get(result.key, storageOptions).then(metaData => {
            const newResults = JSON.parse(metaData.Body.toString()).results;
            combined.results.push(...newResults);
            setResults({ ...combined});
            setIsLoading(false);
          });
        });
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
          <Spin size="large" />
        </div>
      )}
      {!isLoading && searchResult && (
        <Switch>
          <Route path={`${routeMatch.path}`} exact>
            <SearchResults
              searchResult={searchResult}
              searchType={searchType}
            />
          </Route>
          <Route path={`${routeMatch.path}/matches/:matchId/:page?`}>
            <Matches searchResult={searchResult} searchType={searchType} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default Search;
