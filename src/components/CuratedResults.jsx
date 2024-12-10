import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Table, Typography } from "antd";
import { Auth, API } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { Link } from "react-router-dom";

import HelpButton from "./Help/HelpButton";

const { Paragraph } = Typography;

const columns = [
  {
    title: "Line Name",
    dataIndex: "name",
    key: "name",
    render: (name) => <Link to={`/search?q=${name}`}>{name}</Link>,
  },
  {
    title: "Confidence",
    dataIndex: "confidence",
    key: "confidence",
  },
  {
    title: "Anatomical Region",
    dataIndex: "anatomicalRegion",
    key: "anatomicalRegion",
  },
  {
    title: "Cell Type",
    dataIndex: "cellType",
    key: "cellType",
    render: (cellType) => <Link to={`/search?q=${cellType}`}>{cellType}</Link>,
  },
];

function filterAndSortCuratedMatches(matches) {
  // expand the matches.
  const expanded = matches.flatMap((match) => {
    if (match.itemType === "line_name") {
      return match.matches.map((m) => ({
        name: match.name,
        confidence: m.annotation,
        anatomicalRegion: m.region,
        cellType: m.cell_type,
      }));
    }
    if (match.itemType === "cell_type") {
      return match.matches.map((m) => ({
        name: m.line,
        confidence: m.annotation,
        anatomicalRegion: m.region,
        cellType: match.name,
      }));
    }
    return [];
  });

  // strip duplicates if cellType and name are the same
  const deduped = expanded.filter(
    (v, i, a) =>
      a.findIndex((t) => t.cellType === v.cellType && t.name === v.name) === i,
  );
  // sort by name and then confidence, where confident comes before candidate.
  deduped.sort((a, b) => {
    if (a.confidence === "Confident" && b.confidence === "Candidate") {
      return -1;
    }
    if (a.confidence === "Candidate" && b.confidence === "Confident") {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return deduped;
}

export default function CuratedResults({ searchTerm }) {
  const [results, setResults] = useState([]);
  const [loadError, setLoadError] = useState(false);

  // use the searchTerm to fetch curated results from DynamoDB?
  useEffect(() => {
    if (searchTerm !== "") {
      Auth.currentCredentials().then(() => {
        setLoadError(false);
        API.get("SearchAPI", "/curated_matches", {
          queryStringParameters: {
            q: searchTerm,
          },
        })
          .then((response) => {
            if (response.matches.length > 0) {
              const sorted = filterAndSortCuratedMatches(response.matches);
              setResults(sorted);
            }
          })
          .catch((error) => {
            setLoadError(error);
          });
      });
    }
  }, [searchTerm]);

  // if we found anything, then display it in a table above the rest of the results.
  // if we're still waiting for the fetch to complete, then display a loading spinner.
  // if there was an error, then display an error message.

  // if the user has not yet entered a search term, then don't display anything.
  if (!searchTerm) {
    return null;
  }

  // if we didn't find anything, then don't display anything.
  if (results.length === 0) {
    return null;
  }

  if (loadError) {
    return (
      <Card
        title="Curated Matches"
        extra={<HelpButton target="CuratedResults" />}
        style={{ marginBottom: "2em" }}
      >
        <Paragraph type="danger">
          There was a problem retrieving the curated matches.
        </Paragraph>
        <Paragraph>Reloading the page may resolve the issue.</Paragraph>
        <Paragraph>
          If this problem persists, please contact us at{" "}
          <a href="mailto:neuronbridge@janelia.hhmi.org">
            neuronbridge@janelia.hhmi.org
          </a>
          . Please provide the search term used and any other relevant details.
        </Paragraph>
      </Card>
    );
  }

  return (
    <Card
      title="Curated Matches"
      extra={<HelpButton target="CuratedResults" />}
      style={{ marginBottom: "2em", position: "relative" }}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        style={{
          position: "absolute",
          top: "-3px",
          left: "5px",
          color: "#f00",
          fontSize: "1.5em",
        }}
      />
      <Table columns={columns} dataSource={results} pagination={false} />
    </Card>
  );
}

CuratedResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
