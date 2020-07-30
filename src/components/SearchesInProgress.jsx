import React from "react";
import PropTypes from "prop-types";
import { API, graphqlOperation } from "aws-amplify";
import { Button } from "antd";
import SearchSteps from "./SearchSteps";
import * as mutations from "../graphql/mutations";

function deleteSearch(id) {
  API.graphql(
    graphqlOperation(mutations.deleteSearch, { input: { id } })
  ).then(results => console.log(results));
}

export default function SearchesInProgress({searches}) {
  const searchesInProgress = searches.map(search => (
    <li key={search.id}>
      {search.id} - {search.updatedOn}{" "}
      <Button onClick={() => deleteSearch(search.id)}>Delete</Button>
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
