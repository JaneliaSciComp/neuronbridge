import React, { useEffect, useState, useReducer } from "react";
import { Typography, message, Divider } from "antd";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { LoadingOutlined } from "@ant-design/icons";
import SearchUpload from "./SearchUpload";
import SearchList from "./CustomSearch/SearchList";
import DataMigration from "./CustomSearch/DataMigration";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
import { logSearchInfo, fetchItemsNextToken } from "../libs/awsLib";

const { Title } = Typography;

export default function CustomSearchList() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setLoading] = useState(true);
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
    async function fetchSearches() {
      const items = await fetchItemsNextToken({
        query: queries.listSearches,
        variables: { limit: 50 }
      });
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
            message.error(error.message);
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
            message.error(error.message);
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
            message.error(error.message);
          });
        }
      });

      return () => subscription.unsubscribe();
    });
  }, []);

  return (
    <div>
      <SearchUpload
        uploadedFile={uploadedFile}
        handleUpload={setUploadedFile}
      />
      <Divider dashed />
      <Title level={3}>Your Searches</Title>
      <DataMigration />
      {isLoading ? (
        <LoadingOutlined style={{ fontSize: 36 }} spin />
      ) : (
        <SearchList searches={searches} />
      )}
    </div>
  );
}
