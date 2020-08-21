import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { Divider, message } from "antd";
import Matches from "./Matches";
import CustomInputSummary from "./CustomInputSummary";
import NotFound from "./NotFound";
import * as queries from "../graphql/queries";
import config from "../config";
import { signedLink } from "../libs/awsLib";

const storageOptions = {
  level: "private",
  download: true,
  bucket: config.SEARCH_BUCKET
};

export default function Results({ match }) {
  const searchId = match.params.id;
  const [searchMeta, setSearchMeta] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [missingResults, setMissingResults] = useState(false);
  useEffect(() => {
    if (searchId) {
      const query = graphqlOperation(queries.getSearch, {
        id: searchId
      });
      API.graphql(query)
        .then(results => {
          const currentMeta = results.data.getSearch;
          // TODO: we should be using the mask image and not the upload for this
          // When masks are ready this needs to be changed over.
          const uploadUrl = `${currentMeta.searchDir}/${currentMeta.upload}`;
          // TODO: add another step here to generate the real imageURL,
          // rather than use the sameone as the thumbnail.
          signedLink(uploadUrl).then(result => {
            const metaWithSignedUrls = { ...currentMeta, thumbnailURL: result, imageURL: result };
            setSearchMeta(metaWithSignedUrls);
          });
        })
        .catch(error => {
          if (error.response.status === 404) {
            setMissingResults(true);
          } else {
            message.error(error.message);
          }
        });
    }
  }, [searchId]);

  useEffect(() => {
    if (searchMeta && searchMeta.searchDir) {
      const resultFile = searchMeta.upload.replace(/[^.]*$/, "result");
      const resultsUrl = `${searchMeta.searchDir}/${resultFile}`;
      Storage.get(resultsUrl, storageOptions)
        .then(results => {
          const fr = new FileReader();
          fr.onload = evt => {
            const text = evt.target.result;
            const newResults = JSON.parse(text);
            setSearchResults(newResults);
          };
          fr.readAsText(results.Body);
        })
        .catch(error => {
          if (error.response.status === 404) {
            setMissingResults(true);
          } else {
            message.error(error.message);
          }
        });
    }
  }, [searchMeta]);

  if (missingResults) {
    return <NotFound />;
  }

  if (!searchMeta || !searchResults) {
    return <p>...loading</p>;
  }

  const searchType = searchMeta.searchType === "em2lm" ? "skeleton" : "lines";

  return (
    <div>
      <CustomInputSummary searchMeta={searchMeta} />
      <Divider />
      <Matches
        input={searchMeta}
        matches={searchResults}
        searchType={searchType}
      />
    </div>
  );
}

Results.propTypes = {
  match: PropTypes.object.isRequired
};
