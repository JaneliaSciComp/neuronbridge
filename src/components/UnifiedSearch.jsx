import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Storage } from "aws-amplify";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

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
        setByBodyResults({ error });
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
        setByLineResults({ error });
        setLineLoading(false);
      });
  }, [searchTerm]);

  return (
    <div>
      <SearchInput searchTerm={searchTerm} />
      <p>Lines search results:</p>
      {lineLoading && <p>Line search loading...</p>}
      {!lineLoading && byLineResult && (
        <SearchResults
          searchTerm={searchTerm}
          searchResult={byLineResult}
          searchType="lines"
        />
      )}
      <p>Skeletons search results:</p>
      {bodyLoading && <p>body id search loading...</p>}
      {!bodyLoading && byBodyResult && (
        <SearchResults
          searchTerm={searchTerm}
          searchResult={byBodyResult}
          searchType="skeletons"
        />
      )}
    </div>
  );
}
