import React, { useEffect, useReducer } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Button } from "antd";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

function addSearch() {
  const searchDetails = {
    status: "this is a new status"
  };

  API.graphql(
    graphqlOperation(mutations.createSearch, { input: searchDetails })
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
        return searchList.filter((_, index) => index !== value);
      default:
        return searchList;
    }
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateSearch)
    ).subscribe({
      next: data => {
        console.log(data);
        if (data.value.data.onCreateSearch) {
          dispatch({ type: "add", value: data.value.data.onCreateSearch });
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
      {search.id} - {search.status}
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
