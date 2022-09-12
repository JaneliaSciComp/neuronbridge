import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Auth, API } from "aws-amplify";
import { AppContext } from "../containers/AppContext";

export default function MatchReferences({ library, publishedName }) {
  const { appState } = useContext(AppContext);
  const [publication, setPublication] = useState();

  useEffect(() => {
    if (appState?.dataConfig?.datasets) {
      Auth.currentCredentials().then(() => {
        const queryString = library && appState.dataConfig.datasets[library]
          ? `${appState.dataConfig.datasets[library]}#${publishedName}`
          : publishedName;

        API.get("SearchAPI", "/publishing_dois", {
          queryStringParameters: {
            q: queryString,
          },
        })
          .then((papers) => {
            setPublication(papers);
          })
          .catch(() => {
            setPublication(null);
          });
      });
    }
  }, [publishedName, library, appState.dataConfig.datasets]);

  if (!publication) {
    return <span>loading...</span>;
  }

  return <a href={publication.doi}>{publication.citation}</a>;
}

MatchReferences.propTypes = {
  library: PropTypes.string.isRequired,
  publishedName: PropTypes.string.isRequired,
};
