import React, { useEffect, useState, useReducer } from "react";
import { Spin, Typography, message, Divider } from "antd";
import { Auth, API, graphqlOperation } from "aws-amplify";
import SearchUpload from "./SearchUpload";
import SearchList from "./CustomSearch/SearchList";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
import { logSearchInfo, fetchItemsNextToken } from "../libs/awsLib";
import { useInterval } from "../libs/hooksLib";

const { Title } = Typography;

export default function CustomSearchList() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [nextToken, setNextToken] = useState(null);
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

  // reload the page every 25 minutes, this makes sure that any broken sockets
  // get refreshed.
  useInterval(() => window.location.reload(), 1000 * 60 * 25);


  // initial check on page load.
  useEffect(() => {
    async function fetchSearches() {
      const creds = await Auth.currentCredentials();

      const [items, token] = await fetchItemsNextToken({
        query: queries.listItemsByOwner,
        variables: { limit: 20, identityId: creds.identityId, sortDirection: "DESC"},
        limit: 20
      });
      setNextToken(token);
      items.forEach(search => logSearchInfo(search));
      dispatch({ type: "init", value: items });
      setLoading(false);
    }
    fetchSearches();
  }, []);

  useEffect(() => {
    Auth.currentCredentials().then(currentCreds => {
      const subscription = API.graphql(
        graphqlOperation(subscriptions.onCreateSearch, {
          identityId: currentCreds.identityId
        })
      ).subscribe({
        next: response => {
          if (response.value.data.onCreateSearch) {
            logSearchInfo(response.value.data.onCreateSearch);
            dispatch({
              type: "add",
              value: response.value.data.onCreateSearch
            });
          }
        },
        error: e => {
          e.error.errors.forEach(error => {
            message.error({
              duration: 0,
              content: error.message,
              key: "customsearcherror",
              onClick: () => message.destroy("customsearcherror"),
            });
          });
        }
      });

      return () => subscription.unsubscribe();
    });
  }, []);

  useEffect(() => {
    Auth.currentCredentials().then(currentCreds => {
      const subscription = API.graphql(
        graphqlOperation(subscriptions.onDeleteSearch, {
          identityId: currentCreds.identityId
        })
      ).subscribe({
        next: response => {
          if (response.value.data.onDeleteSearch) {
            dispatch({
              type: "remove",
              value: response.value.data.onDeleteSearch.id
            });
          }
        },
        error: e => {
          e.error.errors.forEach(error => {
            message.error({
              duration: 0,
              content: error.message,
              key: "customsearcherror",
              onClick: () => message.destroy("customsearcherror"),
            });
          });
        }
      });

      return () => subscription.unsubscribe();
    });
  }, []);

  useEffect(() => {
    Auth.currentCredentials().then(currentCreds => {
      const subscription = API.graphql(
        graphqlOperation(subscriptions.onUpdateSearch, {
          identityId: currentCreds.identityId
        })
      ).subscribe({
        next: response => {
          if (response.value.data.onUpdateSearch) {
            dispatch({
              type: "update",
              value: response.value.data.onUpdateSearch
            });
          }
        },
        error: e => {
          e.error.errors.forEach(error => {
            message.error({
              duration: 0,
              content: error.message,
              key: "customsearcherror",
              onClick: () => message.destroy("customsearcherror"),
            });
          });
        }
      });

      return () => subscription.unsubscribe();
    });
  }, []);

  const showMoreHandler = async () => {
    const creds = await Auth.currentCredentials();

    const [items, token] = await fetchItemsNextToken({
      query: queries.listItemsByOwner,
      variables: { limit: 20, identityId: creds.identityId, sortDirection: "DESC", nextToken},
      limit: 20
    });
    setNextToken(token);
    items.forEach(search => dispatch({ type: "add", value: search}));
    setLoading(false);
  }

  return (
    <div>
      <ScrollToTopOnMount />
      <SearchUpload
        uploadedFile={uploadedFile}
        handleUpload={setUploadedFile}
      />
      <Divider dashed />
      <Title level={3}>Your Searches ({searches.length}{nextToken ? '+' : null})</Title>
      {isLoading ? (
        <div>
          <Spin size="large" /> Loading...
        </div>) : <SearchList searches={searches} showMore={Boolean(nextToken)}  showMoreHandler={showMoreHandler}/>}
    </div>
  );
}
