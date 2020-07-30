import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

function deleteSearch(id) {
  API.graphql(
    graphqlOperation(mutations.deleteSearch, { input: { id } })
  ).then(results => console.log(results));
}

export default function SearchesComplete({searches}) {
   const searchesComplete = searches.map(search => (
    <li key={search.id}>
      {search.id} - {search.updatedOn}{" "}
      <Button onClick={() => deleteSearch(search.id)}>Delete</Button>
    </li>
  ));

  return (
    <div>
      <p>List of searches that are complete</p>
      <ul>{searchesComplete}</ul>
    </div>
  );
}

SearchesComplete.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.object).isRequired
};
