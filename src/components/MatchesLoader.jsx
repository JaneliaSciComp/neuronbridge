import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Auth, Storage } from "aws-amplify";
import { useParams, Link } from "react-router-dom";
import { Spin, Divider, message } from "antd";
import SearchSummary from "./SearchSummary";
import Matches from "./Matches";
import { AppContext } from "../containers/AppContext";
import { MatchesProvider } from "../containers/MatchesContext";

import "./MatchesLoader.css";

function formatFullImageUrl(baseUrl, result) {
  return `${baseUrl}${result.image.files.ColorDepthMip || result.files.ColorDepthMip}`;
}

function formatFullImageThumbnailUrl(baseUrl, result, searchType) {
  if (searchType === "ppp") {
    return `${baseUrl}${result.files.ColorDepthMip.replace(/\.png$/, '.jpg')}`;
  }
	return `${baseUrl}${result.image.files.ColorDepthMipThumbnail}`;
}

export default function MatchesLoader({ searchResult, searchType }) {
  const [isLoading, setLoading] = useState(false);
  const [matchMeta, setMatchMeta] = useState(null);
  const { appState } = useContext(AppContext);
  const { matchId, searchTerm } = useParams();

  useEffect(() => {
    const storageOptions = {
      customPrefix: {
        public: "",
      },
      level: "public",
      download: true,
    };

    function getMatches() {
      setLoading(true);
      let metadataPath = `${appState.dataVersion}/metadata/cdsresults/${matchId}.json`;
      if (searchType === "ppp") {
        metadataPath = `${appState.dataVersion}/metadata/pppresults/${searchTerm}.json`;
      }

      Auth.currentCredentials()
        .then(() => {
          Storage.get(metadataPath, storageOptions)
            .then((response) => {
              const fr = new FileReader();
              fr.onload = (evt) => {
                const json = JSON.parse(evt.target.result);
                const fixedResults = json.results.map((result) => {
                  const fullImageUrl = formatFullImageUrl(appState.dataConfig.prefixes.ColorDepthMip, result);
                  const fullThumbUrl = formatFullImageThumbnailUrl(appState.dataConfig.prefixes.ColorDepthMipThumbnail, result, searchType);
                  const fixedResult = {
                    ...result,
                    imageURL: fullImageUrl,
                    thumbnailURL: fullThumbUrl,
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
            })
            .catch((e) => {
              if (e.response.status === 404) {
                message.error("No results were found for the provided ID.");
              } else {
                message.error("Unable to load matches from the server");
              }
              setLoading(false);
            });
        })
        .catch(() => {
          message.error("Unable to load matches from the server");
          setLoading(false);
        });
    }

    if ("prefixes" in appState.dataConfig) {
      getMatches();
    }
  }, [
    matchId,
    appState.dataConfig,
    appState.dataVersion,
    searchResult,
    searchType,
    searchTerm,
  ]);

  if (isLoading) {
    return (
      <div className="searchLoader">
        <Spin size="large" />
      </div>
    );
  }

  const matchInput = searchResult.results?.filter(
    (result) => result.id === matchId
  )[0];

  if (matchInput) {
    matchInput.precomputed = true;

    const matches =
      matchMeta && !isLoading ? (
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
        <div className="searchTabs">
          <Link
            className={searchType === "ppp" ? "" : "activeSearch"}
            to={`/search/skeletons/${searchTerm}/matches/${matchId}`}
          >
            Color Depth Search Results
          </Link>
          {matchMeta ? (
            <Link
              className={searchType === "ppp" ? "activeSearch" : ""}
              to={`/search/ppp/${searchTerm}/matches/${matchId}`}
            >
              PatchPerPixMatch Results
            </Link>
          ) : (
            ""
          )}
        </div>
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
  searchType: PropTypes.string.isRequired,
};
