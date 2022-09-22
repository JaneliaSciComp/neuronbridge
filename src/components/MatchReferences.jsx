import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Auth, API } from "aws-amplify";

export default function MatchReferences({ library, publishedName }) {
  const [publication, setPublication] = useState();

  useEffect(() => {
    Auth.currentCredentials().then(() => {
      API.get("SearchAPI", "/publishing_dois", {
        queryStringParameters: {
          q: publishedName,
        },
      })
        .then((papers) => {
          setPublication(papers);
        })
        .catch(() => {
          setPublication(null);
        });
    });
  }, [publishedName, library]);

  if (!publication) {
    return (
      <ul>
        <li>loading...</li>
      </ul>
    );
  }

  if (!publication.doi) {
    return (
      <ul>
        <li>Not found</li>
      </ul>
    );
  }

  return (
    <ul>
      {publication.doi.map((entry) => (
        <li>
          <a href={entry.link}>{entry.citation}</a>
        </li>
      ))}
    </ul>
  );
}

MatchReferences.propTypes = {
  library: PropTypes.string.isRequired,
  publishedName: PropTypes.string.isRequired,
};
