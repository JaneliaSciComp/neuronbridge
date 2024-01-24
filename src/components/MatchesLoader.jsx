import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Auth, Storage } from "aws-amplify";
import { useParams, Link } from "react-router-dom";
import { Spin, Divider, message } from "antd";
import SearchSummary from "./SearchSummary";
import Matches from "./Matches";
import { AppContext } from "../containers/AppContext";
import { MatchesProvider } from "../containers/MatchesContext";
import { setResultsFullUrlPaths, updateFilesPaths } from "../libs/utils";

import "./MatchesLoader.css";

function fixUrls(matches, stores) {
  return {
    ...matches,
    inputImage: {
      ...matches.inputImage,
      files: updateFilesPaths(
        matches.inputImage.files,
        stores[matches?.inputImage?.files?.store],
      ),
    },
    results: setResultsFullUrlPaths(matches.results, stores),
  };
}

export default function MatchesLoader({ searchAlgorithm }) {
  const [isLoading, setLoading] = useState(false);
  const [matchMeta, setMatchMeta] = useState(null);
  const { appState } = useContext(AppContext);
  const { matchId } = useParams();

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
      if (searchAlgorithm === "pppm") {
        metadataPath = `${appState.dataVersion}/metadata/pppmresults/${matchId}.json`;
      }

      Auth.currentCredentials()
        .then(() => {
          Storage.get(metadataPath, storageOptions)
            .then((response) => {
              const fr = new FileReader();
              fr.onload = (evt) => {
                const json = JSON.parse(evt.target.result);
                setMatchMeta(fixUrls(json, appState.dataConfig.stores));
                setLoading(false);
              };
              fr.readAsText(response.Body);
            })
            .catch((e) => {
              if (e.response.status === 404) {
                message.error({
                  duration: 0,
                  content: "No results were found for the provided ID.",
                  key: "matchnotfound",
                  onClick: () => message.destroy("matchnotfound"),
                });
              } else {
                message.error({
                  duration: 0,
                  content: "Unable to load matches from the server",
                  key: "matchloaderror",
                  onClick: () => message.destroy("matchloaderror"),
                });
              }
              setLoading(false);
            });
        })
        .catch(() => {
          message.error({
            duration: 0,
            content: "Unable to load matches from the server",
            key: "matchgenericerror",
            onClick: () => message.destroy("matchgenericerror"),
          });
          setLoading(false);
        });
    }

    if (appState?.dataConfig?.loaded) {
      getMatches();
    }
  }, [matchId, appState.dataConfig, appState.dataVersion, searchAlgorithm]);

  if (isLoading) {
    return (
      <div className="searchLoader">
        <Spin size="large" />
      </div>
    );
  }

  if (matchMeta) {
    const matchInput = matchMeta.inputImage;
    matchInput.precomputed = true;

    const matches =
      matchMeta && !isLoading ? (
        <Matches
          input={matchInput}
          searchAlgorithm={searchAlgorithm}
          matches={matchMeta}
          precomputed
        />
      ) : (
        <p>No matches Found</p>
      );

    return (
      <>
        <div className="searchTabs">
          {matchMeta?.inputImage?.files?.CDSResults ? (
            <Link
              className={searchAlgorithm === "pppm" ? "" : "activeSearch"}
              to={`/matches/cds/${matchMeta?.inputImage?.files?.CDSResults.replace(
                /\.json$/,
                "",
              )}`}
            >
              Color Depth Search Results
            </Link>
          ) : (
            ""
          )}
          {matchMeta?.inputImage?.files?.PPPMResults ? (
            <Link
              className={searchAlgorithm === "pppm" ? "activeSearch" : ""}
              to={`/matches/pppm/${matchMeta?.inputImage?.files?.PPPMResults.replace(
                /\.json$/,
                "",
              )}`}
            >
              PatchPerPixMatch Results
            </Link>
          ) : (
            ""
          )}
        </div>
        <h3>{searchAlgorithm === "pppm" ? "PPPM" : "CDM"} Input Image</h3>
        <SearchSummary searchAlgorithm={searchAlgorithm} input={matchInput} />
        <MatchesProvider>{matches}</MatchesProvider>
      </>
    );
  }
  return (
    <>
      <h3>{searchAlgorithm === "pppm" ? "PPPM" : "CDM"} Input Image</h3>
      <Divider />
      <p>Match results not found...</p>
    </>
  );
}

MatchesLoader.propTypes = {
  searchAlgorithm: PropTypes.string.isRequired,
};
