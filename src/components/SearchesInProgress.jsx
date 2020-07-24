import React, { useEffect, useReducer } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Button } from "antd";
import SearchSteps from "./SearchSteps";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

// NOTE: This code could receive the data as props, if the parent does the fetching
// for this and the completed component.
function deleteSearch(id) {
  API.graphql(
    graphqlOperation(mutations.deleteSearch, { input: { id } })
  ).then(results => console.log(results));
}

export default function SearchesInProgress() {
  const [searches, dispatch] = useReducer((searchList, { type, value }) => {
    switch (type) {
      case "init":
        return value;
      case "add":
        return [...searchList, value];
      case "update":
        return [...searchList.filter(item => item.id !== value.id), value];
      case "remove":
        return searchList.filter(item => item.id !== value);
      default:
        return searchList;
    }
  }, []);

  // initial check on page load.
  useEffect(() => {
    API.graphql(graphqlOperation(queries.listSearches)).then(results =>
      dispatch({ type: "init", value: results.data.listSearches.items })
    );
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
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateSearch)
    ).subscribe({
      next: response => {
        if (response.value.data.onUpdateSearch) {
          dispatch({
            type: "update",
            value: response.value.data.onUpdateSearch
          });
        }
      },
      error: error => {
        console.warn(error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);


  // create a subscription for future updates.
  useEffect(() => {}, []);

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
