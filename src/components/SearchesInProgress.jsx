import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import { formatRelative } from "date-fns";
import SearchSteps from "./SearchSteps";
import { deleteSearch } from "../libs/awsLib";

const { Title } = Typography;

function MaskSelectionLink({ search }) {
  const maskSelectionURL = `/mask-selection/${search.id}`;
  return (
    <div>
      <Title level={3} type="danger">Your image alignment has completed.</Title>
      <p>
        Please <Link to={maskSelectionURL}>select an image and mask region</Link> to start the color
        depth search.
      </p>
    </div>
  );
}

MaskSelectionLink.propTypes = {
  search: PropTypes.object.isRequired
};

export default function SearchesInProgress({ searches }) {
  const searchesInProgress = searches.map(search => {
    return (
      <li key={search.id}>
        {search.upload} -{" "}
        {formatRelative(new Date(search.updatedOn), new Date())}{" "}
        <Button onClick={() => deleteSearch(search)}>Delete</Button>
        <SearchSteps search={search} />
        {search.step === 1 && <MaskSelectionLink search={search} />}
      </li>
    );
  });

  if (searchesInProgress.length === 0) {
    return (
      <div>
        <p>
          You don&apos;t have any searches currently running. Start a new search
          by uploading an image above.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul>{searchesInProgress}</ul>
    </div>
  );
}

SearchesInProgress.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.object).isRequired
};
