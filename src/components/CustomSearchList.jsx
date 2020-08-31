import React, { useEffect, useState, useReducer } from "react";
import { Typography, message, Divider } from "antd";
import { Auth, API, graphqlOperation } from "aws-amplify";
import SearchUpload from "./SearchUpload";
import SearchesInProgress from "./SearchesInProgress";
import SearchesComplete from "./SearchesComplete";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";

const { Title } = Typography;

export default function CustomSearchList() {
  const [uploadedFile, setUploadedFile] = useState(null);
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
    Auth.currentCredentials().then(currentCreds => {
      const subscription = API.graphql(
        graphqlOperation(subscriptions.onCreateSearch, {
          identityId: currentCreds.identityId
        })
      ).subscribe({
        next: response => {
          if (response.value.data.onCreateSearch) {
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
      <Title level={3}>Searches in progress</Title>
      <SearchesInProgress
        searches={searches.filter(search => search.step < 4)}
      />
      <Title level={3}>Searches completed</Title>
      <SearchesComplete
        searches={searches.filter(search => search.step === 4)}
      />
    </div>
  );
}
