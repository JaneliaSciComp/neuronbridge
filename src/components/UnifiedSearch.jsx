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

  useEffect(() => {
    setByLineResults(null);
    setByBodyResults(null);

    if (!searchTerm) {
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

    Storage.list(`metadata/by_body/${searchTerm}`, storageOptions)
      .then(results => {
        if (results.length === 0) {
          throw Error("No results found.");
        }
        const combined = { results: [] };
        results.forEach(result => {
          Storage.get(result.key, storageOptions).then(metaData => {
            const newResults = metaData.Body.results;
            combined.results.push(...newResults);
            setByBodyResults({ ...combined });
            setBodyLoading(false);
          });
        });
      })
      .catch(error => {
        if (error === "No credentials") {
          // Log me out and prompt me to login again.
        }
        setByBodyResults({ error, results: [] });
        setBodyLoading(false);
      });

    Storage.list(`metadata/by_line/${searchTerm}`, storageOptions)
      .then(results => {
        if (results.length === 0) {
          throw Error("No results found.");
        }
        const combined = { results: [] };
        results.forEach(result => {
          Storage.get(result.key, storageOptions).then(metaData => {
            const newResults = metaData.Body.results;
            combined.results.push(...newResults);
            setByLineResults({ ...combined });
            setLineLoading(false);
          });
        });
      })
      .catch(error => {
        if (error === "No credentials") {
          // Log me out and prompt me to login again.
        }
        setByLineResults({ error, results: [] });
        setLineLoading(false);
      });
  }, [searchTerm]);

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
