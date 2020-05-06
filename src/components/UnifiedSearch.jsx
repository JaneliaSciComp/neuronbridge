import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Storage } from "aws-amplify";

import SearchInput from "./SearchInput";
import UnifiedSearchResults from "./UnifiedSearchResults";
import NoSearch from "./NoSearch";

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
  const [nameslist, setNamesList] = useState(null);

  useEffect(() => {
    const storageOptions = {
      customPrefix: {
        public: ""
      },
      level: "public",
      download: true
    };

    Storage.get("publishedNames.txt", storageOptions).then(result => {
      setNamesList(result.Body.split("\n"));
    });
  }, []);

  useEffect(() => {
    setByLineResults(null);
    setByBodyResults(null);

    if (!searchTerm || !nameslist) {
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

    // get the list of names that match the query
    let matchedNames = [];

    if (nameslist) {
      const match = new RegExp(`^${searchTerm.replace(/\*/g, ".*")}$`, "i");
      matchedNames = nameslist.filter(item => {
        return item.match(match);
      });
    }

    const lineNames = matchedNames.filter(name => name.match(/[a-z]/i));
    const lineCombined = { results: [] };
    lineNames.forEach(name => {
        Storage.get(`metadata/by_line/${name}.json`, storageOptions)
          .then(metaData => {
            const newResults = metaData.Body.results;
            lineCombined.results.push(...newResults);
            setByLineResults({ ...lineCombined });
            setLineLoading(false);
          })
          .catch(error => {
            if (error === "No credentials") {
              // Log me out and prompt me to login again.
            }
            setByLineResults({ error, results: [] });
            setLineLoading(false);
          });
    });

    if (lineNames.length === 0) {
      setByLineResults({ results: [] });
      setLineLoading(false);
    }

    const bodyIds = matchedNames.filter(name => !name.match(/[a-z]/i));
    const bodyCombined = { results: [] };
    bodyIds.forEach(name => {
      Storage.get(`metadata/by_body/${name}.json`, storageOptions)
          .then(metaData => {
            const newResults = metaData.Body.results;
            bodyCombined.results.push(...newResults);
            setByBodyResults({ ...bodyCombined });
            setBodyLoading(false);
          })
          .catch(error => {
            if (error === "No credentials") {
              // Log me out and prompt me to login again.
            }
            setByBodyResults({ error, results: [] });
            setBodyLoading(false);
          });
    });

    if (bodyIds.length === 0) {
      setByBodyResults({ results: [] });
      setBodyLoading(false);
    }
  }, [searchTerm, nameslist]);

  return (
    <div>
      <SearchInput searchTerm={searchTerm} />
      {!searchTerm && !byLineResult && !byBodyResult && <NoSearch />}
      {(lineLoading || bodyLoading) && <p>loading...</p>}
      {byLineResult && byBodyResult && (
        <UnifiedSearchResults
          searchTerm={searchTerm}
          linesResult={byLineResult}
          skeletonsResult={byBodyResult}
        />
      )}
    </div>
  );
}
