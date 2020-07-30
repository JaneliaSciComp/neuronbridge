import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { formatRelative } from 'date-fns'
import SearchSteps from "./SearchSteps";
import { deleteSearch } from "../libs/awsLib";

export default function SearchesInProgress({ searches }) {
  const searchesInProgress = searches.map(search => (
    <li key={search.id}>
      {search.upload} - {formatRelative(new Date(search.updatedOn), new Date())}{" "}
      <Button onClick={() => deleteSearch(search)}>Delete</Button>
      <SearchSteps search={search} />
    </li>
  ));

  if (searchesInProgress.length === 0) {
    return (
      <div>
        <p>
          You don&apos;t have any searches currently running. Start a new search by
          uploading an image above.
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
