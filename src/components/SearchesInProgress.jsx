import React from "react";

// TODO: This needs to use either a fetch on a set interval or a websocket to
// check the contents of the upload bucket and fetch all searches that have
// not been completed. Once fetched the search status should be determined
// from the meta data and displayed on the page.

// NOTE: This code receive the data as props, if the parent does the fetching
// for this and the completed component.


export default function SearchesInProgress() {
  return (
    <p>List of searches that are currently running</p>
  );
}
