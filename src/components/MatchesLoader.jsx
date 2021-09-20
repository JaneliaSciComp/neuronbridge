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
  const { matchId, searchTerm } = useParams();

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
      let metadataPath = `${appState.paths.precomputedDataRootPath}/metadata/cdsresults/${matchId}.json`;
      if (searchType === "ppp") {
        metadataPath = `${appState.paths.precomputedDataRootPath}/metadata/pppresults/${searchTerm}.json`;
      }

      Auth.currentCredentials().then(() => {
        Storage.get(metadataPath, storageOptions).then(response => {
          const fr = new FileReader();
          fr.onload = evt => {
            const json = JSON.parse(evt.target.result);
            const fixedResults = json.results.map(result => {
              const fullImageUrl = `${appState.paths.imageryBaseURL}/${result.imageURL}`;
              const fullThumbUrl = `${appState.paths.thumbnailsBaseURLs}/${result.thumbnailURL}`;
              const fixedResult = {
                ...result,
                imageURL: fullImageUrl,
                thumbnailURL: fullThumbUrl
              };
              // The ppp results json starts the rank at 0, but the pdfs start the rank at 1,
              // so we need to add 1 to the pppRank in the JSON to get the same rank in the UI
              // as is displayed in the pdf.
              if (searchType === "ppp") {
                fixedResult.pppRank = result.pppRank + 1;
              }
              return fixedResult;
            });

            setMatchMeta({ ...json, results: fixedResults });
            setLoading(false);
          };
          fr.readAsText(response.Body);
        }).catch(() => {
          message.error("Unable to load matches from the server");
          setLoading(false);
        });
      }).catch(() => {
        message.error("Unable to load matches from the server");
        setLoading(false);
      });
    }

    if ("precomputedDataRootPath" in appState.paths) {
      getMatches();
    }
  }, [matchId, appState.paths, searchResult, searchType, searchTerm]);

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

  if (matchInput) {
    matchInput.precomputed = true;

    const matches = matchMeta && !isLoading ? (
      <Matches
        input={matchInput}
        searchType={searchType}
        matches={matchMeta}
        precomputed
      />
    ) : (
      <p>No matches Found</p>
    );

    return (
      <>
        <h3>{searchType === "ppp" ? "PPPM" : "CDM"} Input Image</h3>
        <SearchSummary type={searchType} input={matchInput} />
        <MatchesProvider>{matches}</MatchesProvider>
      </>
    );
  }
  return (
    <>
      <h3>{searchType === "ppp" ? "PPPM" : "CDM"} Input Image</h3>
      <Divider />
      <p>Match results not found...</p>
    </>
  );

}

MatchesLoader.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired
};
