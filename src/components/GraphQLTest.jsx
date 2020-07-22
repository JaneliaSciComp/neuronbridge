import React, { useEffect, useReducer } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Button } from "antd";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

function addSearch() {
  const searchDetails = {
    status: "this is a new status",
    algorithm: "max",
    searchType: "em2lm"
  };

  API.graphql(
    graphqlOperation(mutations.createSearch, { input: searchDetails })
  ).then(results => console.log(results));
}

function deleteSearch(id) {
  API.graphql(
    graphqlOperation(mutations.deleteSearch, { input: { id } })
  ).then(results => console.log(results));
}

export default function GraphQLTest() {
  const [searches, dispatch] = useReducer((searchList, { type, value }) => {
    switch (type) {
      case "init":
        return value;
      case "add":
        return [...searchList, value];
      case "remove":
        return searchList.filter(item => item.id !== value);
      default:
        return searchList;
    }
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateSearch)
    ).subscribe({
      next: response => {
        if (response.value.data.onCreateSearch) {
          dispatch({ type: "add", value: response.value.data.onCreateSearch });
        }
      },
      error: error => {
        console.warn(error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onDeleteSearch)
    ).subscribe({
      next: response => {
        if (response.value.data.onDeleteSearch) {
          dispatch({
            type: "remove",
            value: response.value.data.onDeleteSearch.id
          });
        }
      },
      error: error => {
        console.warn(error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    API.graphql(graphqlOperation(queries.listSearches)).then(results =>
      dispatch({ type: "init", value: results.data.listSearches.items })
    );
  }, []);

  const formattedSearches = searches.map(search => (
    <li key={search.id}>
      {search.id} - {search.status} - {search.createdOn}{" "}
      <Button onClick={() => deleteSearch(search.id)}>Delete</Button>
    </li>
  ));

  return (
    <div>
      <p>GraphQL test</p>
      <ul>{formattedSearches}</ul>
      <Button onClick={() => addSearch()}>Add Search</Button>
    </div>
  );
}
