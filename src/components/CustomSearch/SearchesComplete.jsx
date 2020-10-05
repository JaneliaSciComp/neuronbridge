import React from "react";
import PropTypes from "prop-types";
import { Collapse } from "antd";
import CompleteSearchSummary from "./CompleteSearchSummary";

const { Panel } = Collapse;

export default function SearchesComplete({ searches }) {
  const searchesComplete = searches
    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
    .map(search => {
      return (
        <Panel header={search.searchMask}  key={search.id} style={{ marginBottom: "1em", listStyle: 'none' }}>
          <CompleteSearchSummary search={search} />
        </Panel>
      );
    });

  if (searchesComplete.length === 0) {
    return (
      <div>
        <p>
          You don&apos;t have any completed searches. Please wait for your in
          progress searches to complete or start a new search by uploading an
          image above.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Collapse ghost>
        {searchesComplete}
      </Collapse>
    </div>
  );
}

SearchesComplete.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.object).isRequired
};
