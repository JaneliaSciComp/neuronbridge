import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Storage, API, graphqlOperation } from "aws-amplify";
import UnifiedSearchResults from "./UnifiedSearchResults";
import * as queries from "../graphql/queries";
import config from "../config";

const storageOptions = {
  level: "private",
  download: true,
  bucket: config.SEARCH_BUCKET
};

export default function Results({ match }) {
  const searchId = match.params.id;
  const [searchMeta, setSearchMeta] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    if (searchId) {
      const query = graphqlOperation(queries.getSearch, {
        id: searchId
      });
      API.graphql(query)
        .then(results => setSearchMeta(results.data.getSearch))
        .catch(error => console.log(error));
    }
  }, [searchId]);

  useEffect(() => {
    if (searchMeta && searchMeta.searchDir) {
      const resultFile = searchMeta.upload.replace(/[^.]*$/, 'result');
      const resultsUrl = `${searchMeta.searchDir}/${resultFile}`;
      Storage.get(resultsUrl, storageOptions).then(results => {
        const fr = new FileReader();
        fr.onload = evt => {
          const text = evt.target.result;
          const newResults = JSON.parse(text);
          setSearchResults(newResults);
        };
        fr.readAsText(results.Body);
      });
    }
  }, [searchMeta]);

  if (!searchMeta || !searchResults) {
    return <p>...loading</p>;
  }

  let em2lmResults = [];
  if (searchMeta.searchType === "em2lm") {
    em2lmResults = searchResults.results;
  }
  const lm2emResults = [];

  return (
    <div>
      <p>Results for {searchMeta.upload}</p>
      <UnifiedSearchResults
        linesResult={{results: em2lmResults}}
        skeletonsResult={{ results: lm2emResults}}
      />
    </div>
  );
}

Results.propTypes = {
  match: PropTypes.object.isRequired
};
