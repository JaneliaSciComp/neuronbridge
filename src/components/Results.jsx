import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { Divider, message } from "antd";
import Matches from "./Matches";
import CustomInputSummary from "./CustomInputSummary";
import ImageWithModal from "./ImageWithModal";
import AlignmentMeta from "./AlignmentMeta";
import NotFound from "./NotFound";
import * as queries from "../graphql/queries";
import config from "../config";
import { signedLink } from "../libs/awsLib";
import { MatchesProvider } from "../containers/MatchesContext";
import { setResultsFullUrlPaths } from "../libs/utils";
import { AppContext } from "../containers/AppContext";

export default function Results({ match }) {
  const searchId = match.params.id;
  const [searchMeta, setSearchMeta] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [missingResults, setMissingResults] = useState(false);
  const [imageUrls, setImageUrls] = useState(null);
  const { appState } = useContext(AppContext);

  useEffect(() => {
    if (searchResults && searchMeta) {
      const unsignedUrl = searchResults.inputImage.files.CDM;
      signedLink(unsignedUrl, searchMeta.identityId).then(result => {
        setImageUrls({
          thumbSrc: result,
          src: result,
        });
      });
    }
  }, [searchResults, searchMeta]);

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
          setSearchMeta(currentMeta);
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
    if (searchMeta && searchMeta.searchDir && appState?.dataConfig?.loaded) {
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
            const urlFixedResults = setResultsFullUrlPaths(newResults.results, appState.dataConfig.stores, { custom: true});
            setSearchResults({...newResults, results: urlFixedResults});
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
  }, [searchMeta, appState.dataConfig.loaded, appState.dataConfig.stores]);

  if (missingResults) {
    return <NotFound />;
  }

  if (!searchMeta || !searchResults) {
    return <p>...loading</p>;
  }

  // we need information from both of these objects further down
  // the tree, and their attributes don't overlap, so they are being
  // combined here to pass as single object to the Matches component.
  const combinedMetaResults = {...searchMeta, ...searchResults.inputImage};

  return (
    <div>
      <CustomInputSummary searchMeta={searchMeta}>
        <ImageWithModal
          thumbSrc={imageUrls ? imageUrls.thumbSrc : ""}
          src={imageUrls ? imageUrls.src : ""}
          title={searchMeta.upload}
          vertical={Boolean(searchMeta.anatomicalRegion.match(/^vnc$/i))}
          maxHeight="350px"
      />
        <AlignmentMeta metadata={searchMeta}/>
      </CustomInputSummary>
      <Divider />
      <MatchesProvider>
        <Matches
          input={combinedMetaResults}
          matches={searchResults}
          searchAlgorithm="cdm"
        />
      </MatchesProvider>
    </div>
  );
}

Results.propTypes = {
  match: PropTypes.object.isRequired
};
