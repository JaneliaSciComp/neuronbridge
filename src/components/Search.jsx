import React, { useEffect, useState, useContext } from "react";
import { useRouteMatch, useParams, Route, Switch } from "react-router-dom";
import { Storage } from "aws-amplify";
import { Spin, message } from "antd";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import MatchesLoader from "./MatchesLoader";
import NoSearch from "./NoSearch";
import { AppContext } from "../containers/AppContext";

import "./Search.css";

function Search() {
  const { searchTerm, searchType } = useParams();
  const [searchResult, setResults] = useState(null);
  const [chosenType, setChosenType] = useState("lines");
  const [isLoading, setIsLoading] = useState(false);
  const routeMatch = useRouteMatch();
  const { appState } = useContext(AppContext);

  useEffect(() => {
    if ("prefixes" in appState.dataConfig) {
      setResults(null);

      if (!searchTerm) {
        return;
      }
      if (searchTerm.length < 3) {
        message.error("Searches must have a minimum of 3 characters.");
        setResults({ error: "Searches must have a minimum of 3 characters." });
        return;
      }
      if (searchTerm.match(/\*(\*|\.)\*/)) {
        message.error("Ha ha, nice try");
        setResults({ error: "Ha ha, nice try" });
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

      const metadataUrl = `${appState.dataVersion}/metadata/${s3group}/${searchTerm}`;

      Storage.list(metadataUrl, storageOptions)
        .then(results => {
          if (results.length === 0) {
            throw Error("No results found.");
          }
          const combined = { results: [] };
          results.forEach(result => {
            Storage.get(result.key, storageOptions).then(metaData => {
              // We can't use metaData.Body.text() here as it is not supported in safari
              const fr = new FileReader();
              fr.onload = evt => {
                const text = evt.target.result;
                const newResults = JSON.parse(text);
                // convert stored relative urls into the full path urls.
                const urlFixedResults = newResults.results.map(newResult => {
                  const fullImageUrl = `${appState.dataConfig.prefixes.ColorDepthMip}${newResult?.files?.ColorDepthMip}`;
                  const fullThumbUrl = `${appState.dataConfig.prefixes.ColorDepthMipThumbnail}${newResult?.files?.ColorDepthMipThumbnail}`;
                  return {...newResult, imageURL: fullImageUrl, thumbnailURL: fullThumbUrl};
                });
                combined.results.push(...urlFixedResults);
                setResults({ ...combined });
                setIsLoading(false);
              };
              fr.readAsText(metaData.Body);
            });
          });
        })
        .catch(error => {
          setResults({ error });
          setIsLoading(false);
        });
    }
  }, [searchTerm, searchType, appState.dataVersion, appState.dataConfig]);

  return (
    <div>
      <SearchInput
        searchType={chosenType}
        searchTerm={searchTerm}
        setType={setChosenType}
      />
      {!searchTerm && !searchResult && <NoSearch searchType={searchType} />}
      {isLoading && (
        <div className="searchLoader">
          <Spin size="large" />
        </div>
      )}
      {!isLoading && searchResult && searchType && (
        <Switch>
          <Route path={`${routeMatch.path}`} exact>
            <SearchResults
              searchTerm={searchTerm}
              searchResult={searchResult}
              searchType={searchType}
            />
          </Route>
          <Route path={`${routeMatch.path}/matches/:matchId/:page?`}>
            <MatchesLoader
              searchResult={searchResult}
              searchType={searchType}
            />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default Search;
