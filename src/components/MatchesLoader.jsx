import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Auth, Storage } from "aws-amplify";
import { useParams } from "react-router-dom";
import { Spin, Divider, message } from "antd";
import SearchSummary from "./SearchSummary";
import Matches from "./Matches";
import { AppContext } from "../containers/AppContext";
import { MatchesProvider } from "../containers/MatchesContext";

export default function MatchesLoader({ searchResult, searchType }) {
  const [isLoading, setLoading] = useState(false);
  const [matchMeta, setMatchMeta] = useState(null);
  const [appState] = useContext(AppContext);
  const { matchId } = useParams();

  useEffect(() => {
    const storageOptions = {
      customPrefix: {
        public: ""
      },
      level: "public",
      download: true
    };

    function getMatches() {
      setLoading(true);
      const metadataPath = `${appState.paths.precomputedDataRootPath}/metadata/cdsresults/${matchId}.json`;

      Auth.currentCredentials().then(() => {
        Storage.get(metadataPath, storageOptions).then(response => {
          const fr = new FileReader();
          fr.onload = evt => {
            const json = JSON.parse(evt.target.result);
            const urlFixedResults = json.results.map(result => {
              const fullImageUrl = `${appState.paths.imageryBaseURL}/${result.imageURL}`;
              const fullThumbUrl = `${appState.paths.thumbnailsBaseURLs}/${result.thumbnailURL}`;
              return {
                ...result,
                imageURL: fullImageUrl,
                thumbnailURL: fullThumbUrl
              };
            });
            setMatchMeta({ ...json, results: urlFixedResults });
            setLoading(false);
          };
          fr.readAsText(response.Body);
        });
      }).catch(() => {
        message.error("Unable to load matches from the server");
        setLoading(false);
      });
    }

    if ("precomputedDataRootPath" in appState.paths) {
      getMatches();
    }
  }, [matchId, appState.paths, searchResult]);

  if (isLoading) {
    return (
      <div className="searchLoader">
        <Spin size="large" />
      </div>
    );
  }

  const matchInput = searchResult.results.filter(
    result => result.id === matchId
  )[0];

  matchInput.precomputed = true;

  const matches = matchMeta ? (
    <Matches
      input={matchInput}
      searchType={searchType}
      matches={matchMeta}
      precomputed
    />
  ) : (
    <Spin size="large" />
  );

  return (
    <>
      <h3>{searchType === "ppp" ? "PPP" : "CDM"} Input Image</h3>
      <SearchSummary type={searchType} input={matchInput} />
      <Divider />
      <MatchesProvider>{matches}</MatchesProvider>
    </>
  );
}

MatchesLoader.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired
};
