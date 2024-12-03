import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { Link } from "react-router-dom";

import HelpButton from "./Help/HelpButton";

const columns = [
  {
    title: "Line Name",
    dataIndex: "name",
    key: "name",
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

export default function CuratedResults({ searchTerm }) {
  const [results, setResults] = useState([]);

  // use the searchTerm to fetch curated results from DynamoDB?
  useEffect(() => {
    // fetch results from DynamoDB
    setResults([
      {
        key: "1",
        name: "MB018B",
        confidence: "candidate",
        anatomicalRegion: "Brain",
        cellType: "KCg-d",
      },
      {
        key: "2",
        name: "MB018B",
        confidence: "candiate",
        anatomicalRegion: "Brain",
        cellType: "KCg-m",
      },
      {
        key: "3",
        name: "MB018B",
        confidence: "confident",
        anatomicalRegion: "Brain",
        cellType: "MBON13",
      },
    ]);
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

  return (
    <Card
      title="Curated Results"
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
