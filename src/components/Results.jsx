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
import { MatchesProvider } from "../containers/MatchesContext";

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
          if (!currentMeta) {
            setMissingResults(true);
            return;
          }
          const uploadUrl = `${currentMeta.searchDir}/${currentMeta.displayableMask}`;
          // TODO: add another step here to generate the real imageURL,
          // rather than use the same one as the thumbnail.
          signedLink(uploadUrl, currentMeta.identityId).then(result => {
            const metaWithSignedUrls = {
              ...currentMeta,
              thumbnailURL: result,
              imageURL: result
            };
            metaWithSignedUrls.precomputed = false;
            setSearchMeta(metaWithSignedUrls);
          });
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setMissingResults(true);
          } else {
            message.error(error.message);
          }
        });
    }
  }, [searchId]);

  useEffect(() => {
    if (searchMeta && searchMeta.searchDir) {
      const resultFile = searchMeta.searchMask.replace(/[^.]*$/, "result");
      const resultsUrl = `${searchMeta.searchDir}/${resultFile}`;

      /* Admin users need an alternative method to fetch Items from S3, because
      the code from Amplify, Storage.get(), uses the currently logged in users
      identityId to build the request to AWS when using the private level.
      Since we want to be able to see other users files we need to pass their
      identityId. In order to do this we have to use a nasty hack where we set
      the query level to public and create a "private" customPrefix that
      contains the identityId of the owner of the file we wish to get. */

      const storageOptions = {
        level: "public",
        download: true,
        customPrefix: { public: `private/${searchMeta.identityId}/` },
        bucket: config.SEARCH_BUCKET
      };

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
            setSearchResults({ results: [] });
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
      <MatchesProvider>
        <Matches
          input={searchMeta}
          matches={searchResults}
          searchType={searchType}
        />
      </MatchesProvider>
    </div>
  );
}

Results.propTypes = {
  match: PropTypes.object.isRequired
};
