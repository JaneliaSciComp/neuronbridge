import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Storage, Auth, API } from "aws-amplify";
import { message, Typography } from "antd";

import SearchInput from "./SearchInput";
import UnifiedSearchResults from "./UnifiedSearchResults";
import NoSearch from "./NoSearch";
import { AppContext } from "../containers/AppContext";
import { setResultsFullUrlPaths } from "../libs/utils";

const { Title, Paragraph } = Typography;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function splitOnLastOccurrence(str, substring) {
  const arr = str.split(substring);
  const after = arr.pop();
  const before = arr.join(substring);

  return [before, after];
}

export default function UnifiedSearch() {
  const query = useQuery();
  const searchTerm = query.get("q");

  const [byLineResult, setByLineResults] = useState(null);
  const [byBodyResult, setByBodyResults] = useState(null);
  const [loadedTerm, setLoadedTerm] = useState(null);
  const [lineLoading, setLineLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [bodyLoading, setBodyLoading] = useState(false);
  const [foundItems, setFoundItems] = useState(0);
  const { appState } = useContext(AppContext);

  // strip out the dataset from the body id if present and run the
  // search with just the body id, eg: manc:v1.0:26362 -> 26362
  // Then filter out results that don't match a bodyid that
  // includes the dataset when the results are returned.
  const [searchDataset, searchBodyIdOrName] = splitOnLastOccurrence(
    searchTerm,
    ":",
  );

  useEffect(() => {
    function readMetaData(metaData, combinedResults, setResults) {
      return new Promise((resolve, reject) => {
        // We can't use metaData.Body.text() here as it is not supported in safari
        const fr = new FileReader();
        fr.onload = (evt) => {
          const text = evt.target.result;
          const newResults = JSON.parse(text);
          // convert stored relative urls into the full path urls.
          const urlFixedResults = setResultsFullUrlPaths(
            newResults.results,
            appState.dataConfig.stores,
          );
          combinedResults.results.push(...urlFixedResults);
          resolve(setResults({ ...combinedResults }));
        };
        fr.onerror = reject;
        fr.readAsText(metaData.Body);
      });
    }

    // We want to be able to support links from neuprint, that are for datasets
    // not in neuronbridge. In order to do that without having to resort to
    // hard coding a dataset version translation table into one or the other
    // site, we can use dataset wildcards, eg: 'hemibrain:*' to search for all
    // versions of hemibrain.
    const searchRegex = new RegExp(searchTerm.replace("*", ".*"), "i");
    if (appState.dataConfig.loaded && loadedTerm !== searchTerm) {
      setLoadedTerm(searchTerm);
      setByLineResults(null);
      setByBodyResults(null);

      // don't do anything if we don't have a searchTerm
      if (!searchTerm) {
        return;
      }

      // don't let people search with strings shorter than 3 characters.
      // This returns too many results.
      if (searchTerm.length < 3) {
        message.error("Searches must have a minimum of 3 characters.");
        setByLineResults({
          error: "Searches must have a minimum of 3 characters.",
          results: [],
        });
        setByBodyResults({
          error: "Searches must have a minimum of 3 characters.",
          results: [],
        });
        return;
      }
      if (searchTerm.match(/\*(\*|\.)\*/)) {
        message.error("Ha ha, nice try");
        setByLineResults({ error: "Ha ha, nice try", results: [] });
        setByBodyResults({ error: "Ha ha, nice try", results: [] });
        return;
      }

      setLineLoading(true);
      setBodyLoading(true);

      const storageOptions = {
        customPrefix: {
          public: "",
        },
        level: "public",
        download: true,
      };

      Auth.currentCredentials().then(() => {
        setLoadError(false);
        API.get("SearchAPI", "/published_names", {
          queryStringParameters: { q: searchBodyIdOrName },
        })
          .then((items) => {
            const lineCombined = { results: [] };
            const bodyCombined = { results: [] };

            const allItems = items.names
              .sort((a, b) => {
                if (a.searchKey === b.searchKey) {
                  return 0;
                }
                if (a.searchKey < b.searchKey) {
                  return -1;
                }
                return 1;
              })
              .map((match) => {
                if (match.keyType === "publishingName") {
                  const byLineUrl = `${appState.dataVersion}/metadata/by_line/${match.name}.json`;
                  return Storage.get(byLineUrl, storageOptions)
                    .then((metaData) =>
                      readMetaData(metaData, lineCombined, setByLineResults),
                    )
                    .catch((error) => {
                      if (error === "No credentials") {
                        // Log me out and prompt me to login again.
                      }
                      lineCombined.error = error;
                      setByLineResults(lineCombined);
                    });
                }
                if (match.keyType === "bodyID") {
                  const byBodyUrl = `${appState.dataVersion}/metadata/by_body/${match.name}.json`;
                  return Storage.get(byBodyUrl, storageOptions)
                    .then((metaData) =>
                      readMetaData(metaData, bodyCombined, setByBodyResults),
                    )
                    .catch((error) => {
                      if (error === "No credentials") {
                        // Log me out and prompt me to login again.
                      }
                      bodyCombined.error = error;
                      setByBodyResults(bodyCombined);
                    });
                }
                if (
                  match.keyType === "neuronInstance" ||
                  match.keyType === "neuronType"
                ) {
                  return match.bodyIDs.map((body) => {
                    const [bodyID] = Object.entries(body)[0];
                    const byBodyUrl = `${appState.dataVersion}/metadata/by_body/${bodyID}.json`;
                    return Storage.get(byBodyUrl, storageOptions)
                      .then((metaData) =>
                        readMetaData(metaData, bodyCombined, setByBodyResults),
                      )
                      .catch((error) => {
                        if (error === "No credentials") {
                          // Log me out and prompt me to login again.
                        }
                        bodyCombined.error = error;
                        setByBodyResults(bodyCombined);
                      });
                  });
                }
                return Promise.resolve();
              });

            // switch this line to Promise.any if you want the items to load in
            // to the page as they complete.
            const allPromisses = Promise.all(allItems.flat());

            // once all the items have loaded, we can clean up.
            allPromisses.then(() => {
              // remove duplicates from the combined results. This can happen if we are
              // loading data from a partial neurontype string, eg: WED01
              setFoundItems(bodyCombined.results.length);
              if (bodyCombined.results.length > 0) {
                const ids = bodyCombined.results.map((result) => result.id);
                bodyCombined.results = bodyCombined.results.filter(
                  ({ id }, index) => !ids.includes(id, index + 1),
                );
                // filter out items that don't match the original serachTerm if a
                // dataset was used.
                if (searchDataset && searchDataset.length > 0) {
                  bodyCombined.results = bodyCombined.results.filter((item) =>
                    item.publishedName.match(searchRegex),
                  );
                }

                setByBodyResults(bodyCombined);
              }

              if (lineCombined.results.length === 0) {
                setByLineResults({ results: [] });
              }

              if (bodyCombined.results.length === 0) {
                setByBodyResults({ results: [] });
              }
              setLineLoading(false);
              setBodyLoading(false);
            });
          })
          .catch((e) => setLoadError(e));
      });
    }
  }, [
    searchTerm,
    loadedTerm,
    appState.dataConfig,
    appState.dataVersion,
    searchBodyIdOrName,
    searchDataset,
  ]);

  const searchError = (
    <div>
      <Title>System Error</Title>
      <Paragraph>There was a problem contacting the search service.</Paragraph>
      <Paragraph>Reloading the page may resolve the issue.</Paragraph>
      <Paragraph>
        If this problem persists, please contact us at{" "}
        <a href="mailto:neuronbridge@janelia.hhmi.org">
          neuronbridge@janelia.hhmi.org
        </a>
        .
      </Paragraph>
    </div>
  );

  return (
    <div>
      <SearchInput searchTerm={searchTerm} />
      {!searchTerm ? <NoSearch /> : ""}
      {(lineLoading || bodyLoading) && !loadError ? <p>loading...</p> : ""}
      {loadError ? searchError : ""}
      {byLineResult && byBodyResult && !lineLoading && !bodyLoading ? (
        <>
          <UnifiedSearchResults
            searchTerm={searchTerm}
            linesResult={byLineResult}
            skeletonsResult={byBodyResult}
          />
          {foundItems > byBodyResult.results.length ? (
            <p>
              <b>
                There are additional matches for your search term in different datasets. To view them
                search for &lsquo;
                <Link to={`/search?q=${searchBodyIdOrName}`}>
                  {searchBodyIdOrName}
                </Link>
                &rsquo;
              </b>
            </p>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
