import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Storage, Auth, API } from "aws-amplify";
import { message } from "antd";

import SearchInput from "./SearchInput";
import UnifiedSearchResults from "./UnifiedSearchResults";
import NoSearch from "./NoSearch";
import { AppContext } from "../containers/AppContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function UnifiedSearch() {
  const query = useQuery();
  const searchTerm = query.get("q");

  const [byLineResult, setByLineResults] = useState(null);
  const [byBodyResult, setByBodyResults] = useState(null);
  const [lineLoading, setLineLoading] = useState(false);
  const [bodyLoading, setBodyLoading] = useState(false);
  const [appState] = useContext(AppContext);

  useEffect(() => {
    function fixUrlResults(newResults) {
      return newResults.results.map(result => {
        const fullImageUrl = `${appState.paths.imageryBaseURL}/${result.imageURL}`;
        const fullThumbUrl = `${appState.paths.thumbnailsBaseURLs}/${result.thumbnailURL}`;
        return {
          ...result,
          imageURL: fullImageUrl,
          thumbnailURL: fullThumbUrl
        };
      });
    }

    function readMetaData(metaData, combinedResults, setResults) {
      return new Promise((resolve, reject) => {
        // We can't use metaData.Body.text() here as it is not supported in safari
        const fr = new FileReader();
        fr.onload = evt => {
          const text = evt.target.result;
          const newResults = JSON.parse(text);
          // convert stored relative urls into the full path urls.
          const urlFixedResults = fixUrlResults(newResults);
          combinedResults.results.push(...urlFixedResults);
          resolve(setResults({ ...combinedResults }));
        };
        fr.onerror = reject;
        fr.readAsText(metaData.Body);
      });
    }

    if ("precomputedDataRootPath" in appState.paths) {
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
          results: []
        });
        setByBodyResults({
          error: "Searches must have a minimum of 3 characters.",
          results: []
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
          public: ""
        },
        level: "public",
        download: true
      };

      Auth.currentCredentials().then(() => {
        API.get("SearchAPI", "/published_names", {
          queryStringParameters: { q: searchTerm }
        }).then(items => {
          const lineCombined = { results: [] };
          const bodyCombined = { results: [] };

          const allItems = items.names
            .sort((a, b) => {
              if (a.key === b.key) {
                return 0;
              }
              if (a.key < b.key) {
                return -1;
              }
              return 1;
            })
            .map(match => {
              if (match.keyType === "publishingName") {
                const byLineUrl = `${appState.paths.precomputedDataRootPath}/metadata/by_line/${match.key}.json`;
                return Storage.get(byLineUrl, storageOptions)
                  .then(metaData => {
                    return readMetaData(
                      metaData,
                      lineCombined,
                      setByLineResults
                    );
                  })
                  .catch(error => {
                    if (error === "No credentials") {
                      // Log me out and prompt me to login again.
                    }
                    lineCombined.error = error;
                    setByLineResults(lineCombined);
                  });
              }
              if (match.keyType === "bodyID") {
                const byBodyUrl = `${appState.paths.precomputedDataRootPath}/metadata/by_body/${match.key}.json`;
                return Storage.get(byBodyUrl, storageOptions)
                  .then(metaData => {
                    return readMetaData(
                      metaData,
                      bodyCombined,
                      setByBodyResults
                    );
                  })
                  .catch(error => {
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
                return match.bodyIDs.map(bodyID => {
                  const byBodyUrl = `${appState.paths.precomputedDataRootPath}/metadata/by_body/${bodyID}.json`;
                  return Storage.get(byBodyUrl, storageOptions)
                    .then(metaData => {
                      return readMetaData(
                        metaData,
                        bodyCombined,
                        setByBodyResults
                      );
                    })
                    .catch(error => {
                      if (error === "No credentials") {
                        // Log me out and prompt me to login again.
                      }
                      bodyCombined.error = error;
                      setByBodyResults(bodyCombined);
                    });
                });
              }
              console.log(match.keyType, match);
              return Promise.resolve();
            });

          // switch this line to Promise.any if you want the items to load in
          // to the page as they complete.
          const allPromisses = Promise.all(allItems.flat());

          // once all the items have loaded, we can clean up.
          allPromisses.then(() => {
            // remove duplicates from the combined results. This can happen if we are
            // loading data from a partial neurontype string, eg: WED01
            if (bodyCombined.results.length > 1) {
              const ids = bodyCombined.results.map(result => result.id);
              bodyCombined.results = bodyCombined.results.filter(
                ({ id }, index) => !ids.includes(id, index + 1)
              );
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
        });
      });
    }
  }, [searchTerm, appState.paths]);

  return (
    <div>
      <SearchInput searchTerm={searchTerm} />
      {!searchTerm && <NoSearch />}
      {(lineLoading || bodyLoading) && <p>loading...</p>}
      {byLineResult && byBodyResult && !lineLoading && !bodyLoading && (
        <UnifiedSearchResults
          searchTerm={searchTerm}
          linesResult={byLineResult}
          skeletonsResult={byBodyResult}
        />
      )}
    </div>
  );
}
