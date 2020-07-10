import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Button } from "antd";
import SearchSteps from "./SearchSteps";
import config from "../config";

const AWS = require("aws-sdk");

// TODO: This needs to use either a fetch on a set interval or a websocket to
// check the contents of the upload bucket and fetch all searches that have
// not been completed. Once fetched the search status should be determined
// from the meta data and displayed on the page.

// NOTE: This code could receive the data as props, if the parent does the fetching
// for this and the completed component.

export default function SearchesInProgress() {
  const [searchesList, setSearchesList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function checkSearchStatus() {
    Auth.currentCredentials().then(creds => {
      const s3 = new AWS.S3({
        credentials: Auth.essentialCredentials(creds)
      });

      const userDirectory = `private/${creds.identityId}/`;

      window.s3 = s3;
      window.Auth = Auth;
      s3.listObjectsV2(
        {
          Bucket: config.SEARCH_BUCKET,
          Prefix: userDirectory,
          Delimiter: "/"
        },
        (err, data) => {
          window.result = data;

          if (data) {
            setSearchesList(
              data.CommonPrefixes.map(prefixObj =>
                prefixObj.Prefix.replace(userDirectory, "").replace("/", "")
              )
            );
          }
        }
      );
    });
  }

  useEffect(() => {
    // initial check on page load.
    checkSearchStatus();
    // followed by automatic updates every 10 seconds.
    if (refresh) {
      const interval = setInterval(() => {
        checkSearchStatus();
      }, 10000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [refresh]);

  const searchesInProgress = searchesList.map(searchName => (
    <li key={searchName}>
      {searchName}
      <SearchSteps />
    </li>
  ));

  return (
    <div>
      <p>
        List of searches that are currently running{" "}
        <Button
          onClick={() => {
            setRefresh(current => !current);
          }}
        >
          {refresh ? "Disable Auto Refresh" : "Enable Auto Refresh"}
        </Button>
      </p>
      <ul>{searchesInProgress}</ul>
    </div>
  );
}
