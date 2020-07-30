import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import SearchSteps from "./SearchSteps";
import { deleteSearch } from "../libs/awsLib";

export default function SearchesInProgress({searches}) {
  const searchesInProgress = searches.map(search => (
    <li key={search.id}>
      {search.upload} - {search.updatedOn}{" "}
      <Button onClick={() => deleteSearch(search)}>Delete</Button>
      <SearchSteps search={search}/>
    </li>
  ));

  return (
    <div>
      <p>List of searches that are currently running </p>
      <ul>{searchesInProgress}</ul>
    </div>
  );
}

SearchesInProgress.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.object).isRequired
};
