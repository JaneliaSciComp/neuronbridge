import React, { useEffect, useReducer } from "react";
import { Typography } from "antd";
import { API, graphqlOperation } from "aws-amplify";
import SearchUpload from "./SearchUpload";
import SearchesInProgress from "./SearchesInProgress";
import SearchesComplete from "./SearchesComplete";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";

const { Title } = Typography;

export default function CustomSearchList() {
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

  return (
    <div>
      <Title level={2}>My Searches</Title>
      <SearchUpload />
      <Title level={3}>Searches in progress</Title>
        <SearchesInProgress searches={searches.filter(search => search.step < 3)} />
      <Title level={3}>Searches completed</Title>
        <SearchesComplete searches={searches.filter(search => search.step === 3)} />
    </div>
  );
}
